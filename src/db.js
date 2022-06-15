import AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_KEY } from './constants.js';

let awsConfig = {
    region:'us-east-1',
    endpoint:`http://dynamodb.us-east-1.amazonaws.com`,
    accessKeyId:AWS_ACCESS_KEY_ID,
    secretAccessKey:AWS_SECRET_KEY
}

AWS.config.update(awsConfig);

let db = new AWS.DynamoDB.DocumentClient();

export default db;