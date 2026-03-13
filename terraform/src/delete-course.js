const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  const command = new DeleteItemCommand({
    TableName: "cloudtech-dev-courses",
    Key: {
      id: { S: event.id }
    }
  });

  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({ deleted: event.id })
  };
};
