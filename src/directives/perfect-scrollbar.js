// src/directives/perfect-scrollbar.js
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

export default {
    mounted(el, binding) {
        // 初始化 Perfect Scrollbar 实例
        const ps = new PerfectScrollbar(el, {
            wheelPropagation: true ,// 禁用鼠标滚轮事件冒泡
            suppressScrollX: true,
            ...binding.value, // 允许传递自定义选项
        });

        // 将实例绑定到元素，以便在组件卸载时可以访问
        el._ps_instance = ps;
    },
    updated(el) {
        // 每次更新时调用 update，确保内容变化后滚动条仍然有效
        if (el._ps_instance) {
            el._ps_instance.update();
        }
    },
    unmounted(el) {
        // 销毁 Perfect Scrollbar 实例
        if (el._ps_instance) {
            el._ps_instance.destroy();
            delete el._ps_instance;
        }
    },
};
