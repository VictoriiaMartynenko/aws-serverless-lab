const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  const id = event.pathParameters ? event.pathParameters.id : event.id;

  const params = {
    TableName: "cloudtech-dev-courses",
    Key: {
      id: { S: id }
    }
  };

  try {
    await client.send(new DeleteItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Course deleted" })
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};
