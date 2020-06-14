import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { PassengerSeat } from '../seatAllocator/SeatAllocator';

const getSeatAllocation: APIGatewayProxyHandler = async (event, context) => {
  const { passengerId = uuid() } = event.pathParameters || {};

  const randomPassengerSeat: PassengerSeat = {
    passengerId,
    groupId: uuid(),
    seatNumber: `${Math.round(Math.random() * 50)}${getRandomSeatLetter()}`,
    riskFactor: Math.random() * 100,
  };

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(randomPassengerSeat),
  };
};

export default getSeatAllocation;

const HARDCODED_SEAT_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
function getRandomSeatLetter() {
  return HARDCODED_SEAT_LETTERS[
    Math.floor(Math.random() * HARDCODED_SEAT_LETTERS.length)
  ];
}
