// src/api/like.js

import request from './index';

// 点赞文章
export function likeArticle(articleId) {
    return request({
        url: `/likes/${articleId}`,
        method: 'post',
    });
}

// 取消点赞文章
export function unlikeArticle(articleId) {
    return request({
        url: `/likes/${articleId}`,
        method: 'delete',
    });
}
