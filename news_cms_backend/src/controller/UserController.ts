/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-02-16 19:12:16
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-13 16:18:42
 * @FilePath: \news_cms\src\controller\UserController.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */
// src/controllers/user.ts
import { Context } from 'koa';
import UserService from '../service/UserService';
import { User } from '../entity/User';

export default class UserController {
  /**
   * @description: 用户列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listUser(ctx: Context) {
    try {
      const users = await UserService.listUser();

      ctx.success(users);
    } catch (error) {
      ctx.fail('查询失败');
    }
  }

  /**
   * @description: 查询用户（token）
   * @param {Context} ctx
   * @return {*}
   */
  public static async searchUser(ctx: Context) {
    try {
      const { userId } = ctx.state.user;
      const user = await UserService.showUserDetail(userId);
      console.log('用户详情', user);
      
      ctx.success(user);
    } catch (error) {
      ctx.fail('查询失败');
    }
  }

  /**
   * @description: 用户详情
   * @param {Context} ctx
   * @return {*}
   */
  public static async showUserDetail(ctx: Context) {
    try {
      const user = await UserService.showUserDetail(ctx.params.id);

      ctx.success(user);
    } catch (error) {
      ctx.fail('查询失败');
    }
  }

  /**
   * @description: 更新用户
   * @param {Context} ctx
   * @return {*}
   */
  public static async updateUser(ctx: Context) {
    try {
      const { username, roleId, regionId, userDefault, roleState } = ctx.request.body;
      const user = { username, roleId, regionId, userDefault, roleState } as User;
      await UserService.updateUser(ctx.params.id, user);

      ctx.success('修改成功');
    } catch (error) {
      ctx.fail('修改失败');
    }
  }

  /**
   * @description: 删除用户
   * @param {Context} ctx
   * @return {*}
   */
  public static async deleteUser(ctx: Context) {
    try {
      await UserService.deleteUser(ctx.params.id);

      ctx.success('删除成功');
    } catch (error) {
      ctx.fail('删除失败');
    }
  }
}
