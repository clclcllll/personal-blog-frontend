// src/utils/message.js

import { ElMessage } from 'element-plus'; // 如果使用 Element Plus 组件库

export function showMessage(type, message) {
    ElMessage({
        message,
        type,
        duration: 3000,
    });

}
