import request from '../utils/request'
import {User} from "@/views/user-manage/types";

// 获取用户列表
export const reqGetUserList = () => {
    return request.get(`/user/list`);
}

// 添加用户
export const reqAddUser = (values: Partial<User>) => {
    return request.post(`/user`, {
        ...values,
        roleState: true,
        userDefault: false
    });
}

// 删除用户
export const reqDeleteUser = (id:string) => {
    return request.delete(`/user/${id}`);
}

// 更新用户信息
export const reqUpdateUser = (id:string, userinfo:Partial<User>) => {
    return request.patch(`/user/${id}`,{
        ...userinfo
    });
}

// 登陆
export const reqLogin = (username:string, password:string) => {
    console.log(username, password)
    return request({
        method:'post',
        url:'/auth/login',
        data:{
            username,
            password
        }
    })
}

// 查询用户（根据token）
export const reqGetUserInfo = () => request.get('/user')
