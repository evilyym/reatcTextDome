import path from 'path';

import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql', // 数据库类型
  host: 'localhost', // mysql 服务地址
  port: 3306, // mysql 服务启动端口
  username: 'root', // mysql 用户名
  password: 'admin0120', // mysql 密码
  database: 'mysql', // 数据库
  entities: [path.join(__dirname, '/../**/*.entity.{js,ts}')], // '../**/*.entity.{js,ts}')], // typeorm 实体
  entityPrefix: 'zm-', // 数据库表前缀
  logging: true, // 开启日志
});

export default dataSource;
