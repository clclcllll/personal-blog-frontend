// src/api/comment.js

import request from './index';

// 获取评论列表
export function getComments(params) {
    return request({
        url: '/comments',
        method: 'get',
        params,
    });
}

// 添加评论
export function addComment(data) {
    return request({
        url: '/comments',
        method: 'post',
        data,
    });
}
// 获取所有文章的所有评论（管理员专用）
export function getAllComments(params) {
    return request({
        url: '/comments/admin/all',
        method: 'get',
        params,
    });
}

// 删除评论
export function deleteComment(id) {
    return request({
        url: `/comments/${id}`,
        method: 'delete',
    });
}
