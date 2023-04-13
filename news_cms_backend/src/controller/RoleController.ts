/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-12 12:15:43
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-12 20:29:02
 * @FilePath: \news_cms\src\controller\RoleController.ts
 * @Description: 一级角色控制层
 *
 * CopyRole (c) 2023 by 山上沙锅, All Roles Reserved.
 */

import RoleService from '../service/RoleService';
import { Context } from 'koa';

export default class RoleController {
  /**
   * @description: 角色列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listRole(ctx: Context) {
    try {
      const roleList = await RoleService.listRole();

      ctx.success(roleList);
    } catch (error) {
      ctx.fail('查询失败');
    }
  }
  /**
   * @description: 删除角色
   * @param {Context} ctx
   * @return {*}
   */
  public static async deleteRole(ctx: Context) {
    try {
      await RoleService.deleteRole(ctx.params.id);

      ctx.success('删除成功');
    } catch (error) {
      ctx.fail('删除失败');
    }
  }

  /**
   * @description: 更新角色权限
   * @param {Context} ctx
   * @return {*}
   */
  public static async updateRoleRights(ctx: Context) {
    try {
      const { parentRights, subRights } = ctx.request.body;
    //   await RoleService.updateRoleRights();
        console.log(parentRights);
        console.log(subRights);
        
      ctx.success('更新成功');
    } catch (error) {
      ctx.fail('更新失败');
    }
  }
}
