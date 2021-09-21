import winston from "winston"
// import { env } from "./config"


const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

// const level = () => {
//   return env.isDev ? 'info' : 'warn'
// }


const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `${info.level}: ${info.message} - ${info.timestamp} `,
    // (error) => `${info.level}: ${info.message} - ${info.timestamp} `,
    
  ),
)

winston.addColors(colors)
const Logger = winston.createLogger({
  // level: level(),
  levels,
  format,
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/all.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   Logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }

export default Logger
// import { env } from "./config"



// // Define different colors for each level. 

// /**
//  * 
//  * This method set the current severity based on 
//    the current NODE_ENV: show all the log levels 
//    if the server was run in development mode; otherwise, 
//    if it was run in production, show only warn and error messages.
//  * @returns 
//  */


// // customize logs



// const Logger = winston.createLogger({
//   level: level(),
//   levels,
//   format,
//   transports,
// })

// export default Logger