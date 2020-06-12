export default async function hello(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world!',
      input: event,
    }),
  };
}
