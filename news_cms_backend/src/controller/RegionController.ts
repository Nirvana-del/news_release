/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-02-16 20:22:35
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-10 10:52:08
 * @FilePath: \news_cms\src\controller\RegionController.ts
 * @Description: 新闻地区
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */
import RegionService from '../service/RegionService';
import { Context } from 'koa';

export default class RegionController {
  /**
   * @description: 地区列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listRegion(ctx: Context) {
    try {
      const regionList = await RegionService.listRegion();

      ctx.success(regionList);
    } catch (error) {
      ctx.fail('获取失败');
    }
  }
  /**
   * @description: 新增地区
   * @param {Context} ctx
   * @return {*}
   */
  public static async addRegion(ctx: Context) {
    try {
      await RegionService.addRegion(ctx.request.body);

      ctx.success('新增地区成功');
    } catch (error) {
      ctx.fail('该地区已存在');
    }
  }
  /**
   * @description: 修改地区
   * @param {Context} ctx
   * @return {*}
   */
  public static async updateRegion(ctx: Context) {
    try {
      await RegionService.updateRegion(ctx.params.id, ctx.request.body);

      ctx.success('修改成功');
    } catch (error) {
      ctx.fail('修改失败');
    }
  }
  /**
   * @description: 删除地区
   * @param {Context} ctx
   * @return {*}
   */
  public static async deleteRegion(ctx: Context) {
    try {
      await RegionService.deleteRegion(ctx.params.id);

      ctx.success('删除成功');
    } catch (error) {
      ctx.fail('删除失败');
    }
  }
}
