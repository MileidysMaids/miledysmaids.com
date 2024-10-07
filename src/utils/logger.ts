import winston from "winston";
import moment from "moment";

// ANSI escape codes for background colors
const bgBlue = "\x1b[44m"; // Blue background for info
const bgRed = "\x1b[41m"; // Red background for errors
const bgYellow = "\x1b[43m"; // Yellow background for warnings
const reset = "\x1b[0m"; // Reset all styles

// Create the logger
export const logger = winston.createLogger({
  level: "debug", // Set the default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      const formattedTimestamp = moment(timestamp).format("hh:mm:ss A");

      // Determine the formatting based on the log level
      switch (level) {
        case "debug":
          return `🐞 ${message} \n`; // Blue background for info

        case "info":
          return `${bgBlue} INFO ${reset} ${message}`; // Blue background for info

        case "error":
          return `[${formattedTimestamp}] ${bgRed} ERROR ${reset} ${message}`; // Red background for errors

        case "warn":
          return `[${formattedTimestamp}] ${bgYellow} WARN ${reset} ${message}`; // Yellow background for warnings

        default:
          return level.toUpperCase(); // Regular log levels (info, debug, etc.)
      }
    }),
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
  ],
});

// Utility function to log errors properly
export const logError = (...errors: unknown[]) => {
  const errorMessages: string[] = [];

  errors.forEach((error) => {
    if (error instanceof Error) {
      // If it's an instance of Error, push its message and stack
      const errorMessage = error.message;
      const errorStack = error.stack?.split("\n").slice(1).join("\n") || ""; // Remove the first line from the stack
      errorMessages.push(`${errorMessage}\n${errorStack}`);
    } else {
      // For non-error values, convert to string
      errorMessages.push(String(error));
    }
  });

  // Join all messages with a space and log the combined message
  logger.error(errorMessages.join(" "));
};

// Custom debug logging function that accepts multiple parameters
export const logDebug = (...messages: unknown[]): void => {
  const formattedMessages = messages.map((msg) => {
    if (typeof msg === "object" && msg !== null) return JSON.stringify(msg, null, 2); // Pretty-print objects
    return String(msg); // Convert other types to string
  });

  // Log the combined debug message using winston with a decorative prefix
  logger.debug(formattedMessages.join(" "));
};

export const initializeLogger = () => {
  logger.info("Logger initialized");

  console.log = logDebug;
  console.error = logError;
};
