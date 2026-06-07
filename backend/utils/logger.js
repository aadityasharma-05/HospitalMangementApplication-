// Backend utilities - Logger
import fs from "fs";
import path from "path";

const logsDir = "logs";

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logLevels = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
  DEBUG: "DEBUG",
};

const colors = {
  ERROR: "\x1b[31m", // Red
  WARN: "\x1b[33m", // Yellow
  INFO: "\x1b[36m", // Cyan
  DEBUG: "\x1b[35m", // Magenta
  RESET: "\x1b[0m",
};

const log = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  const fullLog = data
    ? `${logMessage} ${JSON.stringify(data)}`
    : logMessage;

  // Console output with colors
  console.log(`${colors[level]}${fullLog}${colors.RESET}`);

  // File output
  const logFile = path.join(logsDir, `${level.toLowerCase()}.log`);
  fs.appendFileSync(logFile, fullLog + "\n");
};

export const logger = {
  error: (message, data) => log(logLevels.ERROR, message, data),
  warn: (message, data) => log(logLevels.WARN, message, data),
  info: (message, data) => log(logLevels.INFO, message, data),
  debug: (message, data) => {
    if (process.env.NODE_ENV === "development") {
      log(logLevels.DEBUG, message, data);
    }
  },
};
