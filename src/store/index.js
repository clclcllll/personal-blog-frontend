// src/store/index.js

import { createStore } from 'vuex'

// 导入各个模块
import user from './modules/user'
import article from './modules/article'
import category from './modules/category'
import tag from './modules/tag'
import comment from './modules/comment'

// 创建并导出 Vuex Store 实例
export default createStore({
    modules: {
        user,
        article,
        category,
        tag,
        comment
    }
})
