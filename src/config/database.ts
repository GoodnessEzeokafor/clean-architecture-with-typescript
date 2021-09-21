import { DATABASE_URL, DATABASE_NAME } from 'config/config';
import { Db,  MongoClient } from 'mongodb';
import Logger from './winston';


export const DB_BLOG_COLLECTION = "blogs"

// connection to Mongoclient
const MongoConnection = async (): Promise<MongoClient> => {
  try {
    const connection = await MongoClient.connect(DATABASE_URL);

    return Promise.resolve(connection);
  } catch (e) {
    Logger.error(e)
    return Promise.reject(e);
  }
};

// set up database
const MongoGetDatabase = async (connection: MongoClient): Promise<Db> => {
  let database: any;
  try {
    database = connection.db(DATABASE_NAME);
    return Promise.resolve(database);
  } catch (e) {
    // connection.close()
    Logger.error(e);
    database.close();
    return Promise.reject(e);
  }
};
export { MongoGetDatabase, MongoConnection };



