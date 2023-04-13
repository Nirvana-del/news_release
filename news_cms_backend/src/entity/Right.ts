/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-02-16 19:39:29
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-12 19:24:52
 * @FilePath: \news_cms\src\entity\Right.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved. 
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SubRight } from './SubRight';
import { PermissionType, RightType } from '../types';

@Entity()
export class Right {
  constructor(label: string, path: string) {
    this.label = label;
    this.path = path;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true
  })
  label: string;

  @Column({
    unique: true
  })
  path: string;

  @Column({
    type: 'int',
    default: PermissionType.authorized,
  })
  pagePermission: PermissionType;

  @Column({
    type: 'int',
    readonly: true,
    default: RightType.oneLevel,
  })
  grade: RightType;

  @OneToMany(() => SubRight, (subRight: SubRight) => subRight.right)
  children: SubRight[];
}
