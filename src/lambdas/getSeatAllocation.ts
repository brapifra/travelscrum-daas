import { APIGatewayProxyHandler } from 'aws-lambda';

const getSeatAllocation: APIGatewayProxyHandler = async (event, context) => {
  return {
    statusCode: 200,
    body: event.path,
  };
};

export default getSeatAllocation;
