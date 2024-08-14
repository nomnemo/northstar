const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event) => {
    const { content } = JSON.parse(event.body);
    const entryId = `entry-${Date.now()}`;

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            EntryID: entryId,
            Content: content,
            Timestamp: new Date().toISOString()
        }
    };

    await dynamo.put(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Journal entry saved", entryId })
    };
};
