const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, "g"), replace);
};

exports.handler = async (event) => {
  const id = replaceAll(event.title, " ", "-").toLowerCase();

  const course = {
    id: { S: id },
    title: { S: event.title },
    watchHref: { S: `http://www.pluralsight.com/courses/${id}` },
    authorId: { S: event.authorId },
    length: { S: event.length },
    category: { S: event.category }
  };

  const command = new PutItemCommand({
    TableName: "cloudtech-dev-courses",
    Item: course
  });

  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: id,
      title: event.title,
      watchHref: `http://www.pluralsight.com/courses/${id}`,
      authorId: event.authorId,
      length: event.length,
      category: event.category
    })
  };
};
