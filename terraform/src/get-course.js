const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  const command = new GetItemCommand({
    TableName: "cloudtech-dev-courses",
    Key: {
      id: { S: event.id }
    }
  });

  const data = await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(data.Item ? unmarshall(data.Item) : null)
  };
};
