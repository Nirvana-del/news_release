/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-10 10:28:27
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-12 23:03:19
 * @FilePath: \news_cms\src\service\RightService.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Right Reserved.
 */
import { RightRepository } from '../data-source';
import { Right } from '../entity/Right';

export default class RightService {
  /**
   * @description: 一级权限列表
   * @param {Right} Right
   * @return {*}
   */
  public static async listRight(): Promise<Array<Right>> {
    return await RightRepository.find();
  }
  /**
   * @description: 新增权限
   * @param {Right} Right
   * @return {*}
   */
  public static async addRight(Right: Right): Promise<void> {
    await RightRepository.insert(Right);
  }
  /**
   * @description: 修改权限
   * @param {string} RightId
   * @param {Right} Right
   * @return {*}
   */
  public static async updateRight(RightId: string, Right: Right): Promise<void> {
    await RightRepository.update(RightId, Right);
  }

  /**
   * @description: 删除权限
   * @param {string} RightId
   * @return {*}
   */
  public static async deleteRight(RightId: string): Promise<void> {
    await RightRepository.delete(RightId);
  }
}
