// src/utils/request.js

import axios from 'axios';
import { getToken } from './auth';
import { ElMessage } from 'element-plus'; // 如果使用 Element Plus 组件库

// 创建 Axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API || 'http://localhost:3000/api', // API 基础 URL
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在请求发送之前做些什么
        const token = getToken();
        if (token) {
            // 让每个请求都携带令牌
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        // 处理请求错误
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 处理响应数据
        const res = response.data;
        return res;
    },
    error => {
        // 处理响应错误
        if (error.response) {
            const { status, data } = error.response;
            // 处理 401 未授权错误
            if (status === 401) {
                // 可以重定向到登录页或刷新令牌
                // 这里简单地移除令牌并刷新页面
                localStorage.removeItem('token');
                window.location.reload();
            } else {
                ElMessage.error(data.error || '请求失败');
            }
        } else {
            ElMessage.error(error.message || '网络错误');
        }
        return Promise.reject(error);
    }
);

export default service;
