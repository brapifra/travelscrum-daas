import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { SeatAllocation } from '../seatAllocator/SeatAllocator';
import { Aircraft } from '../aircraft/AircraftRepository';

interface FlightDetails {
  flightNumber: string;
  origin: string;
  destination: string;
}

interface SeatAllocationDetail extends SeatAllocation {
  flight: FlightDetails;
  aicraftSeatMap: Aircraft;
}

const getAllocation: APIGatewayProxyHandler = async (event, context) => {
  const { seatAllocationId = uuid() } = event.pathParameters || {};

  const seatAllocation: SeatAllocationDetail = {
    id: seatAllocationId,
    allocations: [
      {
        passengerId: 'brais',
        groupId: 'brais-family',
        riskFactor: 82.85795541065059,
        seatNumber: '67K',
      },
      {
        passengerId: 'moises',
        groupId: 'brais-family',
        riskFactor: 82.85795541065059,
        seatNumber: '31A',
      },
    ],
    flight: {
      flightNumber: 'FL-3987',
      origin: 'MAD',
      destination: 'STN',
    },
    aicraftSeatMap: {
      code: 'eJzTd9f3DvWNCPAEAAvBAoQ%3D',
      seats: [
        { number: '1A', coordinates: { x: 1, y: 1 } },
        { number: '1B', coordinates: { x: 2, y: 1 } },
        { number: '1C', coordinates: { x: 3, y: 1 } },
        { number: '1D', coordinates: { x: 4, y: 1 } },
        { number: '1E', coordinates: { x: 5, y: 1 } },
        { number: '1F', coordinates: { x: 6, y: 1 } },
      ],
    },
  };

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(seatAllocation),
  };
};

export default getAllocation;
