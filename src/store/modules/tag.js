// src/store/modules/tag.js

import { getTags, createTag, updateTag, deleteTag } from '@/api/tag'

const state = {
    tags: []
}

const mutations = {
    SET_TAGS(state, tags) {
        state.tags = tags
    }
}

const actions = {
    // 获取标签列表
    async fetchTags({ commit }) {
        try {
            const response = await getTags()
            commit('SET_TAGS', response.tags)
        } catch (error) {
            console.error(error)
        }
    },
    // 创建标签
    async createTag({ dispatch }, tagData) {
        try {
            await createTag(tagData)
            // 重新获取标签列表
            dispatch('fetchTags')
        } catch (error) {
            console.error(error)
        }
    },
    // 更新标签
    async updateTag({ dispatch }, { id, tagData }) {
        try {
            await updateTag(id, tagData)
            // 重新获取标签列表
            dispatch('fetchTags')
        } catch (error) {
            console.error(error)
        }
    },
    // 删除标签
    async deleteTag({ dispatch }, id) {
        try {
            await deleteTag(id)
            // 重新获取标签列表
            dispatch('fetchTags')
        } catch (error) {
            console.error(error)
        }
    }
}

const getters = {
    tags: state => state.tags
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
