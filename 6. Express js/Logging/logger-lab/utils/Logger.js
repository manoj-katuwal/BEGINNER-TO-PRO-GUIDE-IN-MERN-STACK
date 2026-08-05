import winston from "winston";

 export  const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
        winston.format.colorize({ all: true }), 

    winston.format.timestamp(),
    winston.format.printf(({timestamp, level, message})=> {
        return `${timestamp} | ${level.toUpperCase()} | ${message}`;
    })
  ),

  transports: [
    new winston.transports.Console({ forceConsoleColor: true }),

    new winston.transports.File({ filename: "logs/error.log", level: "error" , json: true}),

    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
