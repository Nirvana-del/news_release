/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-02-16 19:12:16
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-12 22:35:55
 * @FilePath: \news_cms\src\controller\AuthController.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */

import { Context } from 'koa';
import { User } from '../entity/User';
import { RegionRepository, RoleRepository, UserRepository } from '../data-source';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/tokenHandle';

export default class AuthController {
  /**
   * @description: 用户登录
   * @param {Context} ctx
   * @return {*}
   */
  public static async login(ctx: Context) {
    console.log(ctx);
    const { username, password } = ctx.request.body;
    const user = await UserRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        regionId: true,
        roleId: true,
        password: true,
      },
    });
    try {
      let compareResult = bcrypt.compareSync(password, user.password);
      if (!compareResult) {
        ctx.fail('账号或密码错误');
      } else {
        const accessToken = generateToken({
          userId: user.id,
          roleId: user.roleId,
          regionId: user.regionId,
          username: user.username,
        });
        ctx.success({
          tokenType: 'Bearer',
          accessToken,
        });
      }
    } catch (error) {
      console.log(error);

      ctx.fail('账号未注册');
    }
  }

  /**
   * @description: 用户注册
   * @param {Context} ctx
   * @return {*}
   */
  public static async register(ctx: Context) {
    try {
      const { username, password, roleId, regionId } = ctx.request.body;
      const countUsers = await UserRepository.countBy({ username });
      if (countUsers) {
        ctx.fail('用户名已经存在');
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPwd = bcrypt.hashSync(password, salt);
      const newUser = new User();
      const role = await RoleRepository.findOne({
        where: {
          id: roleId,
        },
      });
      const region = await RegionRepository.findOne({
        where: {
          id: regionId,
        },
      });
      newUser.username = username;
      newUser.role = role;
      newUser.region = region;
      newUser.password = hashPwd;
      // 保存到数据库
      await UserRepository.save(newUser);
      ctx.success('注册成功');
    } catch (error) {
      ctx.fail('注册失败');
    }
  }

  public static async getUserInfo(ctx: Context) {
    try {
      console.log(ctx.state.user);
      const { userId } = ctx.state.user;
      const user = await UserRepository.find({
        where:{
          id: userId
        },
        relations: {
          role: {rightList: true, subRightList: true},
          region: true
        }
      })
      console.log(user);
      ctx.success(user);
    } catch (error) {
      ctx.fail('查询失败');
    }
  }
}
