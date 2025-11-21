# 如何记录日志

#### js ts fetch 示例
```javascript
fetch('http://localhost:3001/api/log', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ message: '测试日志' })
})
```

# 流程
1.你现在代码中需要打印日志的地方调用这个api传入日志
2.让用户测试该功能
3.用户告诉你测试完了
4.你调用getLogs工具获取全部日志