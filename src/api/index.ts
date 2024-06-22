import request from '../utils/request';
import mockrequest from '../utils/mockrequest';
import {LoginInfo, Register} from '../types/user';

export const fetchData = () => {
    return mockrequest({
        url: './mock/table.json',
        method: 'get'
    });
};

export const fetchUserData = () => {
    return mockrequest({
        url: './mock/user.json',
        method: 'get'
    });
};

export const fetchRoleData = () => {
    return mockrequest({
        url: './mock/role.json',
        method: 'get'
    });
};

// 添加登录，注册接口
export const login = (data: LoginInfo) => {
    return request({
        url: '/login',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data
    });
}

export const register = (data: Register) => {
    return request({
        url: '/register',
        method: 'post',
        data
    });
}
