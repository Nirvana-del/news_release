/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-09 18:48:34
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-10 14:22:11
 * @FilePath: \news_cms\src\utils\tokenHandle.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */
// core/util.js

import jwt from 'jsonwebtoken';
import { TOKEN_CONF } from '../config/index';
const { secretKey, expiresIn } = TOKEN_CONF;

// 使用jwt生成token，传入用户id和权限
function generateToken(payload: object) {
  const token = jwt.sign(
    payload,
    secretKey,
    {
      expiresIn,
    },
  );
  return token;
}
async function verifyToken(token: string) {
  try {
    jwt.verify(token.split(' ')[1], secretKey);
    return true;
  } catch (e) {
    return false;
  }
}

function getUserId(token: string) {
  try {
    const userId = jwt.decode(token.split(' ')[1]);
    console.log(userId);

    return userId;
  } catch (e) {
    return null;
  }
}
export { generateToken, verifyToken, getUserId };
