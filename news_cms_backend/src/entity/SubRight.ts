/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-02-16 19:41:00
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-13 15:03:00
 * @FilePath: \news_cms\src\entity\SubRight.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved. 
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Right } from './Right';
import { PermissionType, RightType } from '../types';

@Entity()
export class SubRight {
  constructor(label: string, path: string, rightId: string, pagePermission?: PermissionType, routePermission?: PermissionType) {
    this.rightId = rightId
    this.label = label;
    this.path = path;
    this.pagePermission = pagePermission;
    this.routePermission = routePermission;
  }
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  label: string;

  @Column()
  path: string;

  @Column({
    type: 'int',
    default: PermissionType.unAuthorized,
  })
  pagePermission: PermissionType;

  @Column({
    type: 'int',
    default: PermissionType.unAuthorized,
  })
  routePermission: PermissionType;

  @Column({
    type: 'int',
    readonly:true,
    default: RightType.twoLevel,
  })
  grade: RightType;

  @ManyToOne(() => Right, (right: Right) => right.children)
  right: Right;

  @Column()
  rightId: string
}
