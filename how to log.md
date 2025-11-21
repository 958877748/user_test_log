# 如何打日志

## 日志记录 API

本项目提供了一个简单的日志记录 API，可以通过 HTTP POST 请求记录日志消息。
服务器运行在 `http://localhost:3001`。

### 请求格式

- **方法**: POST
- **URL**: `/api/log`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "message": "你的日志消息"
}
```

### 使用示例

#### curl 示例
```bash
curl -X POST http://localhost:3001/api/log \
  -H "Content-Type: application/json" \
  -d '{"message": "应用启动成功"}'
```

#### JavaScript fetch 示例
```javascript
fetch('http://localhost:3001/api/log', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ message: '测试日志' })
})
```