import { json, urlencoded } from 'body-parser';
import express from 'express';
import { useExpressServer } from 'routing-controllers';

import 'reflect-metadata';
import ds from './data-source';
import { UserController } from './src/controllers/user.controller';

async function init() {
  // 新增：初始化 DataSource
  await ds
    .initialize()
    .then(() => {
      console.log('数据源已初始化！');
    })
    .catch((e: any) => {
      console.log('数据源初始化时出错', e);
    });

  const app = express();

  // body 解析相关中间件
  // 解析 json 格式
  app.use(json());
  // 解析 urlencoded body
  // 会在 request 对象上挂载 body 属性，包含解析后的数据。
  // 这个新的 body 对象包含 key-value 键值对，若设置 extended 为 true，则键值可以是任意累心个，否则只能是字符串或数组。
  app.use(urlencoded({ extended: true }));

  // 将当前实例注册到 routing-controllers
  useExpressServer(app, {
    controllers: [UserController],
  });

  app.listen(3000, () => {
    console.log(`  App is running at http://localhost:3000\n`);
    console.log('  Press CTRL-C to stop\n');
  });
}

init();
