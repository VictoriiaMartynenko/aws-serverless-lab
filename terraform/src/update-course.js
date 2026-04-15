const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  const body = event.body ? JSON.parse(event.body) : event;
  const id = event.pathParameters ? event.pathParameters.id : body.id;

  const params = {
    TableName: "cloudtech-dev-courses",
    Item: {
      id: { S: id },
      title: { S: body.title },
      watchHref: { S: body.watchHref },
      authorId: { S: body.authorId },
      length: { S: body.length },
      category: { S: body.category }
    }
  };

  try {
    await client.send(new PutItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({
        id,
        title: body.title,
        watchHref: body.watchHref,
        authorId: body.authorId,
        length: body.length,
        category: body.category
      })
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};
