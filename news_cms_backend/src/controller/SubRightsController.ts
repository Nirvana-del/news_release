/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-12 19:37:19
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-12 19:40:02
 * @FilePath: \news_cms\src\controller\SubRightsController.ts
 * @Description: 二级权限控制层
 * 
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved. 
 */

import SubRightService from '../service/SubRightService';
import { Context } from 'koa';

export default class SubRightsController {
    /**
   * @description: 二级权限列表
   * @param {Context} ctx
   * @return {*}
   */
    public static async listRight(ctx: Context) {
      try {
        const subRightList = await SubRightService.listSubRight();
  
        ctx.success(subRightList);
      } catch (error) {
        ctx.fail('查询失败');
      }
    }
  /**
   * @description: 删除权限
   * @param {Context} ctx
   * @return {*}
   */
  public static async deleteSubSubRight(ctx: Context) {
    try {
      await SubRightService.deleteSubRight(ctx.params.id);

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
  public static async updateSubRight(ctx: Context) {
    try {
      await SubRightService.updateSubRight(ctx.params.id, ctx.request.body);

      ctx.success('修改成功');
    } catch (error) {
      ctx.fail('修改失败');
    }
  }
}
