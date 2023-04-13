/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-02-16 21:23:12
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-13 14:51:32
 * @FilePath: \news_cms\src\types\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export enum RightType {
  oneLevel = 1,
  twoLevel,
}

export enum PermissionType {
  unAuthorized,
  authorized,
}

export enum UserRole {
  SUPER_ADMIN = '1',
  REGION_ADMIN = '2',
  REGION_EDITOR = '3',
}

export enum AuditState {
  Draft,
  UnderReview,
  Approved,
  Disapproved,
}

export enum PublishState {
  Unpublished,
  ToPublish,
  Published,
  Offline,
}
