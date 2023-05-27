
import winston from "winston";


let logDate=new Date().toDateString();
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error_logs/error_" + logDate+ ".log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/info_logs/info_" + logDate + ".log",
    }),
  ],
});

export default logger;

// import winston, { format } from "winston";

//  export const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//       //
//       // - Write all logs with level `error` and below to `error.log`
//       // - Write all logs with level `info` and below to `combined.log`
//       //
//       new winston.transports.Console(),
//       new winston.transports.File({
//          filename: 'log/error.log',
//           level: 'error',
//           format:format.combine(format.timestamp(),format.json())
//          }),
//       new winston.transports.File({ 
//         level:'info',
//         format:format.combine(format.timestamp(),format.json()),
//         filename: 'log/combined.log'
//        }),
//     ],
//   });

  // export default logger;