// src/api/user.js

import request from './index';

// 用户注册
export function register(data) {
    return request({
        url: '/users/register',
        method: 'post',
        data,
    });
}

// 用户登录
export function login(data) {
    return request({
        url: '/users/login',
        method: 'post',
        data,
    });
}

// 获取用户信息
export function getUserProfile() {
    return request({
        url: '/users/profile',
        method: 'get',
    });
}

// 用户注销（如果需要后端处理）
export function logout() {
    return request({
        url: '/users/logout',
        method: 'post',
    });
}
// 获取用户列表
export function getUsers(params) {
    return request({
        url: '/users',
        method: 'get',
        params,
    });
}

// 更新用户信息
export function updateUser(id, data) {
    return request({
        url: `/users/${id}`,
        method: 'put',
        data,
    });
}

// 删除用户
export function deleteUser(id) {
    return request({
        url: `/users/${id}`,
        method: 'delete',
    });
}