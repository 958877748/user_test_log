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
  uri: "file:///mcplog的使用示例",
  name: "mcplog的使用示例",
  mimeType: "text/plain",
  async load() {
    const content = await fs.readFile('example.md', 'utf8');
    return {
      text: content,
    };
  },
});

server.addTool({
  name: "getLogs",
  description: "获取所有日志并清空日志列表(tips:如果不懂怎么打印mcplog,读取附带的资源)",
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
import cors from 'cors';

const app = express();

app.use(cors());

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
