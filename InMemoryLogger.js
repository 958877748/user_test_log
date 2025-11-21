class InMemoryLogger {
  constructor() {
    this.logs = [];
  }

  /**
   * Records a log message with a timestamp and level.
   * @param {string} level - The log level (e.g., 'info', 'warn', 'error').
   * @param {string} message - The log message to record.
   */
  _log(level, message) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message); // Handle non-string messages
    }
    const timestamp = new Date().toISOString();
    this.logs.push({ timestamp, level, message });
    console.log(`[Server Log - ${level.toUpperCase()}]: ${message}`);
  }

  // --- Methods expected by fastmcp ---

  info(message) {
    this._log('info', message);
  }

  warn(message) {
    this._log('warn', message);
  }

  error(message) {
    this._log('error', message);
  }

  debug(message) {
    this._log('debug', message);
  }

  // Keep the original 'log' as an alias for 'info'
  log(message) {
    this.info(message);
  }

  // --- Custom methods for our use case ---

  /**
   * Retrieves all stored logs.
   * @returns {Array<Object>} A copy of the logs array.
   */
  getLogs() {
    return [...this.logs];
  }

  /**
   * Clears all stored logs.
   */
  clearLogs() {
    this.logs = [];
  }
}

module.exports = { InMemoryLogger };
