/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-10 10:28:55
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-13 17:53:57
 * @FilePath: \news_cms\src\service\UserService.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */
import { UserRepository } from '../data-source';
import { User } from '../entity/User';

export default class UserService {
  /**
   * @description: 用户列表
   * @return {*}
   */
  public static async listUser(): Promise<Array<User>> {
    const users = await UserRepository.find({
      relations: ['role', 'region']
    });
    return users;
  }

  /**
   * @description: 用户详情
   * @param {string} userId
   * @return {*}
   */
  public static async showUserDetail(userId: string): Promise<User> {
    const user = await UserRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['role', 'region']
    });
    console.log('user');
    // console.log(user);

    return user;
  }

  /**
   * @description: 更新用户信息
   * @param {string} userId
   * @param {User} user
   * @return {*}
   */
  public static async updateUser(userId: string, user: User): Promise<void> {
    await UserRepository.update(userId, user);
  }

  /**
   * @description: 删除用户
   * @param {string} userId
   * @return {*}
   */
  public static async deleteUser(userId: string): Promise<void> {
    await UserRepository.delete(userId);
  }
}
