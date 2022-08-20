const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;
const path = require("path");

const infoPath = path.join(__dirname, "../Logs/info.log");
const errorPath = path.join(__dirname, "../Logs/error.log");

const logger = createLogger({
  transports: [
    new transports.File({
      filename: errorPath,
      level: "error",
      format: combine(label({ label: "error" }), timestamp(), prettyPrint()),
    }),
    new transports.File({
      filename: infoPath,
      level: "info",
      format: combine(label({ label: "info" }), timestamp(), prettyPrint()),
    }),
  ],
});
logger.error("test");
logger.info("test");
module.exports = { logger };
