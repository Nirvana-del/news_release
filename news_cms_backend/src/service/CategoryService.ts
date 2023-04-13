/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-10 10:28:27
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-10 10:46:37
 * @FilePath: \news_cms\src\service\CategoryService.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */
import { CategoryRepository } from '../data-source';
import { Category } from '../entity/Category';

export default class CategoryService {
  /**
   * @description: 栏目列表
   * @return {*}
   */
  public static async listCategory(): Promise<Array<Category>> {
    const categoryList = await CategoryRepository.find();
    return categoryList;
  }
  /**
   * @description: 新增栏目
   * @param {Category} category
   * @return {*}
   */
  public static async addCategory(category: Category): Promise<void> {
    await CategoryRepository.insert(category);
  }
  /**
   * @description: 修改栏目
   * @param {string} categoryId
   * @param {Category} category
   * @return {*}
   */
  public static async updateCategory(categoryId: string, category: Category): Promise<void> {
    await CategoryRepository.update(categoryId, category);
  }

  /**
   * @description: 删除栏目
   * @param {string} categoryId
   * @return {*}
   */
  public static async deleteCategory(categoryId: string): Promise<void> {
    await CategoryRepository.delete(categoryId);
  }
}
