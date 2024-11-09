// src/plugins/errorHandler.js

import { ElMessage } from 'element-plus';

export default {
    install(app) {
        // 添加全局的 Axios 响应拦截器
        app.config.globalProperties.$http.interceptors.response.use(
            response => response,
            error => {
                // 判断是否有响应内容，并且状态码是 400，提取错误信息
                if (error.response && error.response.status === 400) {
                    const errorMessage = error.response.data.error || '请求失败，请重试';

                    // 显示错误消息
                    ElMessage({
                        message: errorMessage,
                        type: 'error',
                        duration: 3000
                    });
                }

                // 将错误继续抛出，以便在组件内仍然可以捕获和处理
                return Promise.reject(error);
            }
        );
    }
};
