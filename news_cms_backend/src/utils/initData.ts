/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-09 19:10:48
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-12 16:56:53
 * @FilePath: \news_cms\src\utils\initData.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */

import { Right } from '../entity/Right';
import { Role } from '../entity/Role';
import { SubRight } from '../entity/SubRight';
import { UserRole } from '../types';
import { Region } from '../entity/Region';
import { Category } from '../entity/Category';
import { AppDataSource } from '../data-source';
import { RoleSubKey } from '../entity/RoleSubKey';
import { RoleRightKey } from '../entity/RoleRightKey';

const initSubRightList = async () => {
  let role1 = new Role('超级管理员', UserRole.SUPER_ADMIN);
  let role2 = new Role('区域管理员', UserRole.REGION_ADMIN);
  let role3 = new Role('区域编辑', UserRole.REGION_EDITOR);

  await AppDataSource.manager.save(role1);
  await AppDataSource.manager.save(role2);
  await AppDataSource.manager.save(role3);
  const r1 = new Right('首页', '/home');
  const r2 = new Right('用户管理', '/user-manage');
  const r3 = new Right('权限管理', '/right-manage');
  const r4 = new Right('新闻管理', '/news-manage');
  const r5 = new Right('审核管理', '/audit-manage');
  const r6 = new Right('发布管理', '/publish-manage');

  // 一级权限
  await AppDataSource.manager.save(r1);
  await AppDataSource.manager.save(r2);
  await AppDataSource.manager.save(r3);
  await AppDataSource.manager.save(r4);
  await AppDataSource.manager.save(r5);
  await AppDataSource.manager.save(r6);

  const s1 = new SubRight('添加用户', '/user-manage/add', r2.id);
  const s2 = new SubRight('删除用户', '/user-manage/delete', r2.id);
  const s3 = new SubRight('修改用户', '/user-manage/update', r2.id);
  const s4 = new SubRight('用户列表', '/user-manage/list', r2.id, 1);
  const s5 = new SubRight('角色列表', '/right-manage/role/list', r3.id, 1);
  const s6 = new SubRight('权限列表', '/right-manage/right/list', r3.id, 1);
  const s7 = new SubRight('修改角色', '/right-manage/role/update', r3.id);
  const s8 = new SubRight('删除角色', '/right-manage/role/delete', r3.id);
  const s9 = new SubRight('修改权限', '/right-manage/right/update', r3.id);
  const s10 = new SubRight('删除权限', '/right-manage/right/delete', r3.id);
  const s11 = new SubRight('新闻列表', '/news-manage/list', r4.id);
  const s12 = new SubRight('撰写新闻', '/news-manage/add', r4.id, 1);
  const s13 = new SubRight('新闻更新', '/news-manage/update/:id', r4.id, 0, 1);
  const s14 = new SubRight('新闻预览', '/news-manage/preview/:id', r4.id, 0, 1);
  const s15 = new SubRight('草稿箱', '/news-manage/draft', r4.id, 1);
  const s16 = new SubRight('新闻分类', '/news-manage/category', r4.id, 1);
  const s17 = new SubRight('审核新闻', '/audit-manage/audit', r5.id, 1);
  const s18 = new SubRight('审核列表', '/audit-manage/list', r5.id, 1);
  const s19 = new SubRight('待发布', '/publish-manage/unpublished', r6.id, 1);
  const s20 = new SubRight('已发布', '/publish-manage/published', r6.id, 1);
  const s21 = new SubRight('已下线', '/publish-manage/sunset', r6.id, 1);
  // 二级权限
  await AppDataSource.manager.save(s1);
  await AppDataSource.manager.save(s2);
  await AppDataSource.manager.save(s3);
  await AppDataSource.manager.save(s4);
  await AppDataSource.manager.save(s5);
  await AppDataSource.manager.save(s6);
  await AppDataSource.manager.save(s7);
  await AppDataSource.manager.save(s8);
  await AppDataSource.manager.save(s9);
  await AppDataSource.manager.save(s10);
  await AppDataSource.manager.save(s11);
  await AppDataSource.manager.save(s12);
  await AppDataSource.manager.save(s13);
  await AppDataSource.manager.save(s14);
  await AppDataSource.manager.save(s15);
  await AppDataSource.manager.save(s16);
  await AppDataSource.manager.save(s17);
  await AppDataSource.manager.save(s18);
  await AppDataSource.manager.save(s19);
  await AppDataSource.manager.save(s20);
  await AppDataSource.manager.save(s21);


  await AppDataSource.manager.save(new RoleRightKey(role1.id, r1.id));
  await AppDataSource.manager.save(new RoleRightKey(role1.id, r2.id));
  await AppDataSource.manager.save(new RoleRightKey(role1.id, r3.id));
  await AppDataSource.manager.save(new RoleRightKey(role1.id, r4.id));
  await AppDataSource.manager.save(new RoleRightKey(role1.id, r5.id));
  await AppDataSource.manager.save(new RoleRightKey(role1.id, r6.id));

  await AppDataSource.manager.save(new RoleRightKey(role2.id, r1.id));
  await AppDataSource.manager.save(new RoleRightKey(role2.id, r2.id));
  await AppDataSource.manager.save(new RoleRightKey(role2.id, r4.id));
  await AppDataSource.manager.save(new RoleRightKey(role2.id, r5.id));
  await AppDataSource.manager.save(new RoleRightKey(role2.id, r6.id));

  await AppDataSource.manager.save(new RoleRightKey(role3.id, r1.id));
  await AppDataSource.manager.save(new RoleRightKey(role3.id, r5.id));
  await AppDataSource.manager.save(new RoleRightKey(role3.id, r6.id));
  const role1Arr = [
    s1,
    s2,
    s3,
    s4,
    s5,
    s6,
    s7,
    s8,
    s9,
    s10,
    s11,
    s12,
    s13,
    s14,
    s15,
    s16,
    s17,
    s18,
    s19,
    s20,
    s21,
  ];
  const role2Arr = [s4, s5, s6, s11, s12, s13, s14, s15, s17, s18, s19, s20, s21];
  const role3Arr = [s11, s12, s13, s14, s15, s18, s19, s20, s21];
  for (let i = 0; i <= role1Arr.length - 1; i++) {
    await AppDataSource.manager.save(new RoleSubKey(role1.id, role1Arr[i].id ));
  }
  for (let i = 0; i <= role2Arr.length - 1; i++) {
    await AppDataSource.manager.save(new RoleSubKey(role2.id, role2Arr[i].id ));
  }
  for (let i = 0; i <= role3Arr.length - 1; i++) {
    await AppDataSource.manager.save(new RoleSubKey(role3.id, role3Arr[i].id ));
  }
};
const initOther = async () => {
  let re1 = new Region('江西省', '江西省');
  let re2 = new Region('广西壮族自治区', '广西壮族自治区');
  let re3 = new Region('广东省', '广东省');
  let re4 = new Region('北京', '北京');
  let re5 = new Region('上海', '上海');
  let re6 = new Region('湖南省', '湖南省');
  let re7 = new Region('湖北省', '湖北省');
  let re8 = new Region('河北省', '河北省');
  let re9 = new Region('河南省', '河南省');
  let re10 = new Region('海南省', '海南省');
  await AppDataSource.manager.save(re1);
  await AppDataSource.manager.save(re2);
  await AppDataSource.manager.save(re3);
  await AppDataSource.manager.save(re4);
  await AppDataSource.manager.save(re5);
  await AppDataSource.manager.save(re6);
  await AppDataSource.manager.save(re7);
  await AppDataSource.manager.save(re8);
  await AppDataSource.manager.save(re9);
  await AppDataSource.manager.save(re10);
  let c1 = new Category('时事新闻', '时事新闻');
  let c2 = new Category('环球经济', '环球经济');
  let c3 = new Category('科学技术', '科学技术');
  let c4 = new Category('军事世界', '军事世界');
  let c5 = new Category('世界体育', '世界体育');
  let c6 = new Category('生活理财', '生活理财');
  await AppDataSource.manager.save(c1);
  await AppDataSource.manager.save(c2);
  await AppDataSource.manager.save(c3);
  await AppDataSource.manager.save(c4);
  await AppDataSource.manager.save(c5);
  await AppDataSource.manager.save(c6);
};

export { initSubRightList, initOther };
