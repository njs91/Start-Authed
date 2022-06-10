import mongodb from 'mongodb';
import { MongoClient } from 'mongodb';

export const USERS_COLLECTION_NAME = 'users';

const url =
  process.env.URI ||
  'mongodb+srv://njs91:bIucm9ZNvYAZiAZG@cluster0.f4crzod.mongodb.net/?retryWrites=true&w=majority'; // @todo remove
const client = new MongoClient(url);
const dbName = process.env.DB_NAME || 'userdb';

let _db: mongodb.Db;

export const connectToDb = async (callback: () => void) => {
  try {
    await client.connect();
    console.log('Connected to db successfully...');
    _db = client.db(dbName); // method connecting and storing the connection to the db (keeps running)
    callback(); // callback(client)
  } catch (err) {
    throw err;
  }
};

export const getDb = () => {
  // method returning db access if exists
  if (_db) {
    return _db;
  }
  throw new Error('No database found');
};
