const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  const command = new PutItemCommand({
    TableName: "cloudtech-dev-courses",
    Item: {
      id: { S: event.id },
      title: { S: event.title },
      watchHref: { S: event.watchHref },
      authorId: { S: event.authorId },
      length: { S: event.length },
      category: { S: event.category }
    }
  });

  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(event)
  };
};
