// src/utils/auth.js

const TOKEN_KEY = 'token';

// 获取令牌
export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

// 设置令牌
export function setToken(token) {
    return sessionStorage.setItem(TOKEN_KEY, token);
}

// 移除令牌
export function removeToken() {
    return sessionStorage.removeItem(TOKEN_KEY);
}
