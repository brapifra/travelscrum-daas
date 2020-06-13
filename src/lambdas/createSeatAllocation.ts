import { APIGatewayProxyHandler } from 'aws-lambda';
import AmadeusAircraftFinder from '../aircraft/AmadeusAircraftFinder';
import SeatAllocator from '../seatAllocator/DummySeatAllocator';

interface EventBody {
  passengers: PassengerDTO[];
  aircraftCode: string;
  itinerary: Itinerary;
}

interface PassengerDTO {
  id: string;
  dateOfBirth: string;
  groupId: string;
  itinerary: Itinerary[];
}

interface Itinerary {
  departure: string;
  arrival: string;
}

const createSeatAllocation: APIGatewayProxyHandler = async (event, context) => {
  const body = parseEventBody(event.body || '{}');
  const aircraft = await AmadeusAircraftFinder.find(body.aircraftCode);
  const seatAllocation = await SeatAllocator.allocate(
    body.passengers,
    aircraft.seats
  );

  return {
    statusCode: 200,
    body: JSON.stringify(seatAllocation),
  };
};

export default createSeatAllocation;

type ParsedEventBody = Omit<EventBody, 'passengers'> & {
  passengers: Passenger[];
};

export type Passenger = Omit<PassengerDTO, 'dateOfBirth'> & {
  dateOfBirth: Date;
};

function parseEventBody(rawBody: string): ParsedEventBody {
  const body: EventBody = JSON.parse(rawBody);

  return {
    ...body,
    passengers: body.passengers.map((passenger) => ({
      ...passenger,
      dateOfBirth: new Date(passenger.dateOfBirth),
    })),
  };
}
