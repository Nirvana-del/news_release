/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-02-16 20:22:35
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-10 10:48:32
 * @FilePath: \news_cms\src\controller\CategoryController.ts
 * @Description: 新闻栏目
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */
import CategoryService from '../service/CategoryService';
import { Context } from 'koa';

export default class CategoryController {
  /**
   * @description: 栏目列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listCategory(ctx: Context) {
    try {
      const categoryList = await CategoryService.listCategory();

      ctx.success(categoryList);
    } catch (error) {
      ctx.fail('获取失败');
    }
  }
  /**
   * @description: 新增栏目
   * @param {Context} ctx
   * @return {*}
   */
  public static async addCategory(ctx: Context) {
    try {
      await CategoryService.addCategory(ctx.request.body);

      ctx.success('新增栏目成功');
    } catch (error) {
      ctx.fail('该栏目已存在');
    }
  }
  /**
   * @description: 修改栏目
   * @param {Context} ctx
   * @return {*}
   */
  public static async updateCategory(ctx: Context) {
    try {
      await CategoryService.updateCategory(ctx.params.id, ctx.request.body);

      ctx.success('修改成功');
    } catch (error) {
      ctx.fail('修改失败');
    }
  }
  /**
   * @description: 删除栏目
   * @param {Context} ctx
   * @return {*}
   */
  public static async deleteCategory(ctx: Context) {
    try {
      await CategoryService.deleteCategory(ctx.params.id);

      ctx.success('删除成功');
    } catch (error) {
      ctx.fail('删除失败');
    }
  }
}
