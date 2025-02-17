/*
 * @Date: 2025-02-17 11:40:15
 * @LastEditors: You yangym@golive.cc
 * @LastEditTime: 2025-02-17 13:16:26
 * @FilePath: \vite-react-ts-seed-master\学习dome\nodeServer.ts
 */
import querystring from 'querystring';

import express from 'express';

const app = express();

// 定义 GET 路由来接收 img 上报数据
app.get('/track', (req, res) => {
  const queryParams = req.query; // 获取查询参数

  console.log('Received tracking data:', queryParams); // 打印接收到的数据

  // 这里可以添加逻辑来保存或进一步处理数据

  // 返回一个透明的像素图片作为响应
  const pixel = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x00, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e,
    0x44, 0xae,
  ]);

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': pixel.length,
  });
  res.end(pixel);
});

// 启动服务器监听端口
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
