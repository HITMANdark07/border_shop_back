import dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;
const MONGO_URI = process.env.MONGO_URI;
const NODE_JWT_SECRET = process.env.NODE_JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PWD = process.env.EMAIL_PWD;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;


const IS_PROD = process.env.NODE_ENV === 'production' ? true : false;


export {  NODE_ENV, MONGO_URI, NODE_JWT_SECRET, GOOGLE_CLIENT_ID, IS_PROD, EMAIL_ID, EMAIL_PWD, CLIENT_ORIGIN,AWS_ACCESS_KEY_ID, AWS_SECRET_KEY  };