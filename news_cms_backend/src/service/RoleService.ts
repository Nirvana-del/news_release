/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-12 19:45:40
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-13 21:16:53
 * @FilePath: \news_cms\src\service\RoleService.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */
import {
  RoleRepository,
} from '../data-source';
import { Role } from '../entity/Role';
import { Tool } from '../utils/Tool';

export default class RoleService {
  /**
   * @description: 返回带有权限标识的角色列表
   * @param {Array} roleList
   * @return {*}
   */  
  public static async handleRoleList(roleList: Array<Role>) {
    return new Promise((resolve, reject) => {
      roleList.forEach(async (role: Role) => {
        const { rightList, subList } = await Tool.getRightsAndSubRights(role.id);
        role.pathList = [
          ...rightList.map((item) => item.path),
          ...subList.map((item) => item.path),
        ];
        if (roleList[roleList.length - 1].pathList) resolve(roleList);
      });
    });
  }
  /**
   * @description: 角色列表
   * @return {*}
   */
  public static async listRole(): Promise<Array<Role>> {
    const roleList = await RoleRepository.find();
    await this.handleRoleList(roleList);
    return roleList;
  }
  /**
   * @description: 新增角色
   * @param {Role} Role
   * @return {*}
   */
  public static async addRole(Role: Role): Promise<void> {
    await RoleRepository.insert(Role);
  }
  /**
   * @description: 修改角色
   * @param {string} RoleId
   * @param {Role} Role
   * @return {*}
   */
  public static async updateRole(RoleId: string, Role: Role): Promise<void> {
    await RoleRepository.update(RoleId, Role);
  }

  /**
   * @description: 删除角色
   * @param {string} RoleId
   * @return {*}
   */
  public static async deleteRole(RoleId: string): Promise<void> {
    await RoleRepository.delete(RoleId);
  }

  public static async updateRoleRights() {}
}
