const winston = require("winston");

export const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({ filename: "logs/combined.log" }),
  ],

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
});
