/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-02-16 19:12:16
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-13 17:51:24
 * @FilePath: \news_cms\src\routes.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved. 
 */
// src/routes.ts
import Router from '@koa/router';
 
import AuthController from './controller/AuthController';
import UserController from './controller/UserController';
import CategoryController from './controller/CategoryController';
import RegionController from './controller/RegionController';
import NewsController from './controller/NewsController';
import RoleRightKeyController from './controller/RoleRightKeyController';
import RightController from './controller/RightsController';
import SubRightsController from './controller/SubRightsController';
import RoleController from './controller/RoleController';
const router = new Router();
 
// auth 相关的路由
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.get('/auth/userinfo', AuthController.getUserInfo);
 
// category 相关的路由
router.get('/category/list', CategoryController.listCategory);
router.post('/category', CategoryController.addCategory);
router.put('/category/:id', CategoryController.updateCategory);
router.delete('/category/:id', CategoryController.deleteCategory);

// news 相关路由
router.get('/news/list', NewsController.listNews);
router.get('/news/allAudit', NewsController.listAllAudit);
router.get('/news/allSunset', NewsController.listAllSunset);
router.get('/news/allPublished', NewsController.listAllPublished);
router.get('/news/mostBrowsing', NewsController.listMostBrowsingNews);
router.get('/news/mostLike', NewsController.listMostLikesNews);
router.get('/news', NewsController.listByPublishState);

router.get('/news/draft', NewsController.listDraft);
router.get('/news/audit', NewsController.listAudit);

router.get('/news/:id', NewsController.newsDetail);
router.post('/news', NewsController.addNews);
router.patch('/news/:id', NewsController.updateNews);
router.delete('/news/:id', NewsController.deleteNews);



// region 相关的路由
router.get('/region', RegionController.listRegion);
router.post('/region', RegionController.addRegion);
router.put('/region/:id', RegionController.updateRegion);
router.delete('/region/:id', RegionController.deleteRegion);

// users 相关的路由
router.get('/user/list', UserController.listUser);
router.get('/user', UserController.searchUser);
router.get('/user/:id', UserController.showUserDetail);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);


// 权限相关路由
router.get('/right/tree', RoleRightKeyController.permissionTree);
router.get('/right/list', RightController.listRight);
router.delete('/right/:id', RightController.deleteRight);
router.patch('/right/:id', RightController.updateRight);
router.get('/sub_right/list', SubRightsController.listRight);
router.delete('/sub_right/:id', SubRightsController.deleteSubSubRight);
router.patch('/sub_right/:id', SubRightsController.updateSubRight);

// 角色相关路由
router.get('/role/list', RoleController.listRole);
router.delete('/role/:id', RoleController.deleteRole);
router.post('/role/:id', RoleController.updateRoleRights);

// 地区相关路由
router.get('/region/list', RegionController.listRegion);
router.delete('/region/:id', RegionController.deleteRegion);
router.post('/region/:id', RegionController.updateRegion);



export default router;