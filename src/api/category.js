// src/api/category.js

import request from './index';

// 获取分类列表
export function getCategories() {
    return request({
        url: '/categories',
        method: 'get',
    });
}
//getCategoryById
export function getCategoryById(id) {
    return request({
        url: `/categories/${id}`,
        method: 'get',
    });
}

// 创建分类
export function createCategory(data) {
    return request({
        url: '/categories',
        method: 'post',
        data,
    });
}

// 更新分类
export function updateCategory(id, data) {
    return request({
        url: `/categories/${id}`,
        method: 'put',
        data,
    });
}

// 删除分类
export function deleteCategory(id) {
    return request({
        url: `/categories/${id}`,
        method: 'delete',
    });
}
