# fastmcp

A lightweight, in-memory logging library designed for capturing and managing logs during manual testing phases.

## Why `fastmcp`?

During manual testing, it's often necessary to inspect the internal state of an application at specific points. While you could use `console.log`, this can lead to cluttered terminal output and makes it hard to separate test-specific logs from other application output.

`fastmcp` provides a simple, in-memory logging solution to address this. It allows you to:

-   **Record** structured logs from anywhere in your code.
-   **Retrieve** all captured logs at the end of a test session.
-   **Clear** the logs to prepare for the next session.

This is particularly useful when an AI or an automated script needs to collect logs generated during a human-led test.

## Installation

```bash
npm install fastmcp
```

## API

The library exports a simple object with three functions.

### `log(message)`

Records a log message. Each log is stored as an object containing a `timestamp` and the `message`.

-   `message` (string): The log message to record.

**Example:**

```javascript
const mcp = require('fastmcp');
mcp.log('User has clicked the login button.');
```

### `getLogs()`

Retrieves a copy of all stored logs.

**Returns:** An array of log objects (`[{ timestamp, message }]`).

**Example:**

```javascript
const logs = mcp.getLogs();
console.log(logs);
// Output:
// [
//   {
//     timestamp: '2023-10-27T10:00:00.000Z',
//     message: 'User has clicked the login button.'
//   }
// ]
```

### `clearLogs()`

Clears all logs from memory. This is useful for resetting the state between test runs.

**Example:**

```javascript
mcp.clearLogs();
const logs = mcp.getLogs(); // logs is now []
```

## Full Usage Example

Here's how you might use `fastmcp` in a project.

**`your-app-module.js`**
```javascript
const mcp = require('fastmcp');

function performUserAction() {
  console.log('Performing some complex action...');
  mcp.log('Starting the user action.');
  // ... business logic ...
  mcp.log('User action completed successfully.');
}

module.exports = { performUserAction };
```

**`run-test.js`**
```javascript
const mcp = require('fastmcp');
const { performUserAction } = require('./your-app-module');

// --- Human Tester Starts ---
// The tester interacts with the application, triggering various actions.
console.log('Simulating a user test...');
performUserAction();
// --- Human Tester Finishes ---

// At the end of the test, the AI or test runner can retrieve the logs.
console.log('\n--- Test Complete ---');
const capturedLogs = mcp.getLogs();
console.log('Captured Logs:');
console.log(JSON.stringify(capturedLogs, null, 2));

// Clean up for the next run.
mcp.clearLogs();
console.log('\nLogs have been cleared.');
const logsAfterClear = mcp.getLogs();
console.log('Current logs:', logsAfterClear);
```
