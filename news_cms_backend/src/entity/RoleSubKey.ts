/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-12 12:47:56
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-12 17:02:16
 * @FilePath: \news_cms\src\entity\RoleSubKey.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved. 
 */
import { Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
@Index(['roleId', 'subRightId'], { unique: true })
export class RoleSubKey {
    constructor(roleId: string, subRightId: string) {
        this.roleId = roleId;
        this.subRightId = subRightId;
      }
    @PrimaryColumn()
    roleId: string

    @PrimaryColumn()
    subRightId: string
}