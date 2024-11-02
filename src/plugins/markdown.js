// src/plugins/markdown.js

import VMdEditor from '@kangc/v-md-editor';
import VuePressTheme from '@kangc/v-md-editor/lib/theme/vuepress';
import hljs from 'highlight.js';

// 确保样式文件在构建时能被正确解析
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// 使用 VuePress 主题
VMdEditor.use(VuePressTheme, {
    Hljs: hljs,
});

// 导出 VMdEditor 插件
export default VMdEditor;
