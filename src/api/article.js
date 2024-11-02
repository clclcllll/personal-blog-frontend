// src/api/article.js

import request from './index';

// 获取文章列表
export function getArticles(params) {
    return request({
        url: '/articles',
        method: 'get',
        params,
    });
}

// 获取文章详情
export function getArticleById(id) {
    return request({
        url: `/articles/${id}`,
        method: 'get',
    });
}

// 创建文章
export function createArticle(data) {
    return request({
        url: '/articles',
        method: 'post',
        data,
    });
}

// 更新文章
export function updateArticle(id, data) {
    return request({
        url: `/articles/${id}`,
        method: 'put',
        data,
    });
}

// 删除文章
export function deleteArticle(id) {
    return request({
        url: `/articles/${id}`,
        method: 'delete',
    });
}

// 上传 Markdown 文件发布文章
export function uploadMarkdown(id, file) {
    const formData = new FormData();
    formData.append('file', file);
    return request({
        url: `/articles/${id}/upload`,
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
