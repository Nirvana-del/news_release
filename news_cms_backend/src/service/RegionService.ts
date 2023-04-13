/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-10 10:28:27
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-10 10:51:16
 * @FilePath: \news_cms\src\service\RegionService.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */
import { RegionRepository } from '../data-source';
import { Region } from '../entity/Region';

export default class RegionService {
  /**
   * @description: 地区列表
   * @return {*}
   */
  public static async listRegion(): Promise<Array<Region>> {
    const RegionList = await RegionRepository.find();
    return RegionList;
  }
  /**
   * @description: 新增地区
   * @param {Region} region
   * @return {*}
   */
  public static async addRegion(region: Region): Promise<void> {
    await RegionRepository.insert(region);
  }
  /**
   * @description: 修改地区
   * @param {string} regionId
   * @param {Region} region
   * @return {*}
   */
  public static async updateRegion(regionId: string, region: Region): Promise<void> {
    await RegionRepository.update(regionId, region);
  }

  /**
   * @description: 删除地区
   * @param {string} regionId
   * @return {*}
   */
  public static async deleteRegion(regionId: string): Promise<void> {
    await RegionRepository.delete(regionId);
  }
}
