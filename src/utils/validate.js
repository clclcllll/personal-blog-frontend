// src/utils/validate.js

// 验证邮箱格式
export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// 验证密码（至少6个字符）
export function isValidPassword(password) {
    return password && password.length >= 6;
}

// 验证用户名（至少3个字符）
export function isValidUsername(username) {
    return username && username.length >= 3;
}

// 验证非空字段
export function isNotEmpty(value) {
    return value !== null && value !== undefined && value !== '';
}
