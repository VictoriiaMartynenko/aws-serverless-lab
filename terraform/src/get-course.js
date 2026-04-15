const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

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
    const data = await client.send(new GetItemCommand(params));

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Course not found" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: data.Item.id.S,
        title: data.Item.title.S,
        watchHref: data.Item.watchHref.S,
        authorId: data.Item.authorId.S,
        length: data.Item.length.S,
        category: data.Item.category.S
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
