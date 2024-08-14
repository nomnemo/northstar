const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event) => {
    const { id } = event.pathParameters;

    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            EntryID: id
        }
    };

    const result = await dynamo.get(params).promise();

    if (result.Item) {
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Journal entry not found" })
        };
    }
};
