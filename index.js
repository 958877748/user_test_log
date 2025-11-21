// In-memory store for logs
let logs = [];

/**
 * Records a log message.
 * Each log entry is an object with a timestamp and the message.
 * @param {string} message - The log message to record.
 */
function log(message) {
  if (typeof message !== 'string') {
    console.error('Log message must be a string.');
    return;
  }
  const timestamp = new Date().toISOString();
  logs.push({ timestamp, message });
}

/**
 * Retrieves all stored logs.
 * @returns {Array<Object>} A copy of the logs array.
 */
function getLogs() {
  return [...logs];
}

/**
 * Clears all stored logs.
 */
function clearLogs() {
  logs = [];
}

// Export the public API
module.exports = {
  log,
  getLogs,
  clearLogs,
};
