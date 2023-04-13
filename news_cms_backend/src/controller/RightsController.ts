/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-12 12:15:43
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-12 23:02:21
 * @FilePath: \news_cms\src\controller\RightsController.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved. 
 */

import RightService from '../service/RightService';
import { Context } from 'koa';

export default class RightController {
  /**
   * @description: 一级权限列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listRight(ctx: Context) {
    try {
      const rightList = await RightService.listRight();

      ctx.success(rightList);
    } catch (error) {
      ctx.fail('查询失败');
    }
  }
  public static async deleteRight(ctx: Context) {
    try {
      await RightService.deleteRight(ctx.params.id);

      ctx.success('删除成功');
    } catch (error) {
      ctx.fail('删除失败');
    }
  }

  /**
   * @description: 更新权限
   * @param {Context} ctx
   * @return {*}
   */
  public static async updateRight(ctx: Context) {
    try {
      await RightService.updateRight(ctx.params.id, ctx.request.body);

      ctx.success('修改成功');
    } catch (error) {
      ctx.fail('修改失败');
    }
  }
}
