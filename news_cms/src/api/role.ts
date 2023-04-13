import requests from '../utils/request'
import {rightsMap} from "@/views/permission-manage/types/permission";

// 获取角色列表
export const reqGetRoleList = () => {
    return requests.get(`/role/list`);
}

// 删除角色
export const reqDeleteRole = (id:number) => {
    return requests.delete(`/role/${id}`);
}

// 更新角色权限
export const reqUpdateRole = (id:number, rightsList:rightsMap) => {
    const { parentRights, subRights  } = rightsList
    console.log(parentRights);
    console.log(subRights);
    return requests({
        method: 'post',
        url: `/role/${id}`,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data:{
            parentRights,
            subRights
        }
    });
}

// // 更新角色权限
// export const reqUpdateRole = (id, rightsMap) => {
//   return requests.patch(`/role/${id}`,{
//     rightsMap
//   });
// }
