const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async () => {
  const command = new ScanCommand({
    TableName: "cloudtech-dev-courses"
  });

  const data = await client.send(command);
  const items = (data.Items || []).map(item => unmarshall(item));

  return {
    statusCode: 200,
    body: JSON.stringify(items)
  };
};
