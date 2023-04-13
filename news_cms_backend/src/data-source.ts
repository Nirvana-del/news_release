import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Category } from './entity/Category';
import { News } from './entity/News';
import { Region } from './entity/Region';
import { Right } from './entity/Right';
import { Role } from './entity/Role';
import { SubRight } from './entity/SubRight';
import { User } from './entity/User';
import { RoleRightKey } from './entity/RoleRightKey';
import { RoleSubKey } from './entity/RoleSubKey';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: '******', // 数据库账号
  password: '******', // 数据库密码
  database: '******', // 数据库名称
  synchronize: true,
  logging: false,
  entities: [
    Category,
    News,
    Region,
    Right,
    Role,
    SubRight,
    User,
    RoleRightKey,
    RoleSubKey
  ],
  migrations: [],
  subscribers: [],
});

export const CategoryRepository = AppDataSource.getRepository(Category);
export const NewsRepository = AppDataSource.getRepository(News);
export const RegionRepository = AppDataSource.getRepository(Region);
export const RightRepository = AppDataSource.getRepository(Right);
export const RoleRepository = AppDataSource.getRepository(Role);
export const SubRightRepository = AppDataSource.getRepository(SubRight);
export const UserRepository = AppDataSource.getRepository(User);
export const RoleRightKeyRepository = AppDataSource.getRepository(RoleRightKey);
export const RoleSubKeyRepository = AppDataSource.getRepository(RoleSubKey);
