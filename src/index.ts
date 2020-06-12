import { APIGatewayProxyHandler } from 'aws-lambda';

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

const handler: APIGatewayProxyHandler = async (event, context) => {
  const body = parseEventBody(event.body || '{}');

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
};

export default handler;

type ParsedEventBody = Omit<EventBody, 'passengers'> & {
  passengers: Passenger[];
};

type Passenger = Omit<PassengerDTO, 'dateOfBirth'> & {
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
