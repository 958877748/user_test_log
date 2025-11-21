const mcp = require('./index'); // In a real project, this would be require('fastmcp')

/**
 * A sample function that simulates a piece of application logic.
 * It uses the mcp logger to record its progress.
 */
function simulateUserJourney() {
  console.log('Simulation started: A user is performing a series of actions.');

  mcp.log('User logged in.');

  console.log('User is navigating to the dashboard...');
  mcp.log('Navigated to /dashboard.');

  console.log('User is updating their profile...');
  // Simulating a delay for an async operation
  setTimeout(() => {
    mcp.log('Profile update successful.');
    console.log('Profile has been updated.');

    // --- Test Scenario Ends Here ---

    // The following code demonstrates how to retrieve and clear logs.
    // This would typically be done by a test runner or an external script.
    concludeTest();
  }, 1000);
}

/**
 * This function simulates what a test runner or an AI would do
 * after the manual test is complete.
 */
function concludeTest() {
  console.log('\n--------------------');
  console.log('Manual Test Finished');
  console.log('--------------------');

  // 1. Retrieve the logs
  const capturedLogs = mcp.getLogs();
  console.log('Logs Captured:');
  console.log(JSON.stringify(capturedLogs, null, 2));

  // 2. Clear the logs for the next run
  mcp.clearLogs();
  console.log('\nLogs have been cleared.');

  // 3. Verify that logs are empty
  const logsAfterClear = mcp.getLogs();
  console.log('Current log count:', logsAfterClear.length); // Expected: 0
}

// Start the simulation
simulateUserJourney();
