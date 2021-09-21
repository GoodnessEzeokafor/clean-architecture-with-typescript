import 'module-alias/register';
import 'reflect-metadata';
import { config } from 'dotenv';
config();
import app from './app';

import Logger from 'config/winston';
import { PORT } from 'config/config';

/**
 * Start Express server.
 */
const server = app.listen(PORT, () => {
  Logger.info(`App is running on port ${PORT}`)
});

export default server;
