import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { PassengerSeat } from '../seatAllocator/SeatAllocator';

const getSeatAllocation: APIGatewayProxyHandler = async (event, context) => {
  const { passengerId = uuid() } = event.pathParameters || {};

  const randomPassengerSeat: PassengerSeat = {
    passengerId,
    groupId: uuid(),
    seatNumber: `${Math.round(Math.random() * 50)}B`,
    riskFactor: Math.round(Math.random() * 100),
  };

  return {
    statusCode: 200,
    body: JSON.stringify(randomPassengerSeat),
  };
};

export default getSeatAllocation;
