/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-12 17:03:54
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-13 16:15:13
 * @FilePath: \news_cms\src\controller\RoleRightKeyController.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved. 
 */

import RoleRightKeyService from '../service/RoleRightKeyService';
import { Context } from 'koa';

export default class RoleRightKeyController {
  /**
   * @description: 权限树
   * @param {Context} ctx
   * @return {*}
   */
  public static async permissionTree(ctx: Context) {
    try {
      const { roleId } = ctx.state.user;
      const rightTree = await RoleRightKeyService.permissionTree(roleId);

      ctx.success(rightTree);
    } catch (error) {
      console.log(error);

      ctx.fail('获取失败');
    }
  }

}
