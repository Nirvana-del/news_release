/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-02-16 19:12:16
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-13 21:57:46
 * @FilePath: \news_cms\src\index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved. 
 */
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import 'reflect-metadata';
import { AppDataSource } from './data-source';

import { logger } from './utils/logger';
import router from './routes';

import { routerResponse } from './utils/routerResponse';
// 导入配置文件
import { TOKEN_CONF } from './config/index';

//一定要在路由之前配置解析Token的中间件
import koaJWT from 'koa-jwt';
import { initOther, initSubRightList } from './utils/initData';

AppDataSource.initialize()
  .then(async () => {
    /**
     * 下面两个方法可初始化部分数据
     */
    // initOther()
    // initSubRightList()
    // 初始化 Koa 应用实例
    const app = new Koa();

    // 注册中间件
    app.use(cors());
    app.use(bodyParser());
    app.use(logger());
    app.use(routerResponse());

    // 身份认证错误中间件
    app.use(async (ctx, next) => {
      return next().catch((err: any) => {
        if (err.status === 401) {
          // 自定义返回结果
          ctx.fail(err.message, 401);
        } else {
          throw err;
        }
      });
    });

    app.use(
      koaJWT({ secret: TOKEN_CONF.secretKey, algorithms: ['HS256'] }).unless({
        path: [/^\/auth\/login/, /^\/auth\/register/],
      }),
    );

    app.use(router.routes()).use(router.allowedMethods()); // 这样当用户通过不正确的 HTTP 方法访问 API 时，就会自动返回 405 Method Not Allowed 状态码。
    // 运行服务器
    app.listen(3005);
  })
  .catch((error) => console.log(error));
