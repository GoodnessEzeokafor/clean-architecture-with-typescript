import express from 'express'
import compression from 'compression' // compresses requests
import {
  MongoClient,
  // MongoClient,
  ObjectId
} from 'mongodb'
import { MongoConnection } from 'config/database'
import Logger from 'config/winston'
import routes from 'routes'
declare global {
  namespace Express {
    interface User {
      email?: string;
      username?: string;
      id?: ObjectId;
      _id?: ObjectId;
    }

    export interface Request {
      user?: User;
    }
  }
}

// Create Express server
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/health', (_req, res) => {
  return res.status(200).json({ msg: "health" })
});

app.use('/api/v1', routes)

// events
// testEvent(watcher);
// connect MONGODB
let mongoConnection: MongoClient;
MongoConnection()
  .then((connection: MongoClient) => {
    mongoConnection = connection;
    Logger.info('Database connection established')
  })
  .catch((e) => {
    Logger.error(e)
  });

export { mongoConnection }
export default app
