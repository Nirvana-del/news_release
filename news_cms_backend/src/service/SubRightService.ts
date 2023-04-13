/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-10 10:28:27
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-12 19:39:08
 * @FilePath: \news_cms\src\service\SubRightService.ts
 * @Description:
 *
 * CopySubRight (c) 2023 by 山上沙锅, All SubRight Reserved.
 */
import { SubRightRepository } from '../data-source';
import { SubRight } from '../entity/SubRight';

export default class SubRightService {
    /**
   * @description: 二级权限列表
   * @param {Right} Right
   * @return {*}
   */
    public static async listSubRight(): Promise<Array<SubRight>> {
      return await SubRightRepository.find();
    }
  /**
   * @description: 新增权限
   * @param {SubRight} SubRight
   * @return {*}
   */
  public static async addSubRight(SubRight: SubRight): Promise<void> {
    await SubRightRepository.insert(SubRight);
  }
  /**
   * @description: 修改权限
   * @param {string} SubRightId
   * @param {SubRight} SubRight
   * @return {*}
   */
  public static async updateSubRight(SubRightId: string, SubRight: SubRight): Promise<void> {
    await SubRightRepository.update(SubRightId, SubRight);
  }

  /**
   * @description: 删除权限
   * @param {string} SubRightId
   * @return {*}
   */
  public static async deleteSubRight(SubRightId: string): Promise<void> {
    await SubRightRepository.delete(SubRightId);
  }
}
