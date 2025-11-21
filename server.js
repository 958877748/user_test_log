const { FastMCP } = require('fastmcp');
const { z } = require('zod');
const { InMemoryLogger } = require('./InMemoryLogger');

// 1. Create an instance of our custom logger
const logger = new InMemoryLogger();

// 2. Define the server configuration, including the tools (methods)
const serverConfig = {
  name: 'user-test-log-server',
  version: '1.0.0',
  logger: logger,
  tools: {
    /**
     * A mock business logic endpoint that logs its actions.
     */
    performAction: {
      input: z.object({
        userId: z.string(),
        action: z.string(),
      }),
      handler: async ({ input }) => {
        // The logger is available on the server instance, which is `this` in the handler context
        logger.log(`Starting action '${input.action}' for user ${input.userId}.`);

        // Simulate some work
        await new Promise(resolve => setTimeout(resolve, 100));

        logger.log(`Action '${input.action}' for user ${input.userId} completed.`);

        return { status: 'success', message: 'Action performed successfully.' };
      },
    },
    /**
     * An endpoint to retrieve all logs from the in-memory logger.
     */
    getLogs: {
      handler: async () => {
        return logger.getLogs();
      },
    },
    /**
     * An endpoint to clear all logs from the in-memory logger.
     */
    clearLogs: {
      handler: async () => {
        logger.clearLogs();
        logger.log('Logs have been cleared by a client request.');
        return { status: 'success', message: 'Logs cleared.' };
      },
    },
  },
};

// 3. Create the FastMCP server instance with the complete configuration
const server = new FastMCP(serverConfig);

// 4. Start the server
server.start();

console.log('MCP Server with custom logger and endpoints is running...');
