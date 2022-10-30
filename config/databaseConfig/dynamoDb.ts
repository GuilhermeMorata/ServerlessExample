const AWS = require("aws-sdk");
const DB = new AWS.DynamoDB.DocumentClient();

export default DB;
