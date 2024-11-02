// src/store/modules/category.js

import { getCategories, createCategory, updateCategory, deleteCategory } from '@/api/category'

const state = {
    categories: []
}

const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories
    }
}

const actions = {
    // 获取分类列表
    async fetchCategories({ commit }) {
        try {
            const response = await getCategories()
            commit('SET_CATEGORIES', response.categories)
        } catch (error) {
            console.error(error)
        }
    },
    // 创建分类
    async createCategory({ dispatch }, categoryData) {
        try {
            await createCategory(categoryData)
            // 重新获取分类列表
            dispatch('fetchCategories')
        } catch (error) {
            console.error(error)
        }
    },
    // 更新分类
    async updateCategory({ dispatch }, { id, categoryData }) {
        try {
            await updateCategory(id, categoryData)
            // 重新获取分类列表
            dispatch('fetchCategories')
        } catch (error) {
            console.error(error)
        }
    },
    // 删除分类
    async deleteCategory({ dispatch }, id) {
        try {
            await deleteCategory(id)
            // 重新获取分类列表
            dispatch('fetchCategories')
        } catch (error) {
            console.error(error)
        }
    }
}

const getters = {
    categories: state => state.categories
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
