// src/api/index.js

import axios from 'axios';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus'; // 如果使用 Element Plus 组件库

// 创建 Axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API || 'http://localhost:3000/api', // API 基础 URL
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在请求发送之前做些什么
        const token = getToken();
        if (token) {
            // 让每个请求都携带令牌
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        // 处理请求错误
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 处理响应数据
        const res = response.data;
        // 可以根据后端自定义的状态码进行统一处理
        if (res.code && res.code !== 200) {
            ElMessage.error(res.message || '请求失败');
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    (error) => {
        // 处理响应错误
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 401:
                    ElMessage.error('未授权，请登录');
                    // 可以执行登出操作，清除令牌，重定向到登录页
                    break;
                case 403:
                    ElMessage.error('拒绝访问');
                    break;
                case 404:
                    ElMessage.error('请求地址出错');
                    break;
                case 500:
                    ElMessage.error('服务器内部错误');
                    break;
                default:
                    ElMessage.error(data.message || '请求失败');
            }
        } else {
            ElMessage.error(error.message || '网络错误');
        }
        return Promise.reject(error);
    }
);

export default service;
