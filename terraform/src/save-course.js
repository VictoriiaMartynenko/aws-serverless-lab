const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, "g"), replace);
};

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const id = replaceAll(body.title, " ", "-").toLowerCase();

  const params = {
    TableName: "cloudtech-dev-courses",
    Item: {
      id: { S: id },
      title: { S: body.title },
      watchHref: { S: `http://www.pluralsight.com/courses/${id}` },
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
        watchHref: `http://www.pluralsight.com/courses/${id}`,
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
