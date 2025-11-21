import fs from 'fs/promises';
import { FastMCP } from "fastmcp";

const server = new FastMCP({
  name: "McpLog",
  version: "1.0.0",
});

/**
 * @type {string[]}
 */
let logs = [];

server.addResource({
  uri: "file:///how_to_log.md",
  name: "how to log.md",
  mimeType: "text/plain",
  async load() {
    const content = await fs.readFile('how to log.md', 'utf8');
    return {
      text: content,
    };
  },
});

server.addTool({
  name: "getLogs",
  description: "获取所有日志并清空日志列表",
  execute: async () => {
    const allLogs = logs.join('\n');
    logs.length = 0;
    return allLogs || '无日志';
  },
});

server.start({
  transportType: "httpStream",
  httpStream: {
    port: 3000,
  },
});

import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/log', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'message required' });
  }
  logs.push(message);
  res.json({ success: true, message: `已记录: ${message}` });
});

app.listen(3001, () => {
  console.log('REST API on http://localhost:3001');
});
