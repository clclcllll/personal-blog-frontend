// src/store/modules/comment.js

import { getComments, addComment, deleteComment } from '@/api/comment'

const state = {
    comments: [],
    total: 0,
    page: 1,
    pages: 1
}

const mutations = {
    SET_COMMENTS(state, data) {
        state.comments = data.comments
        state.total = data.total
        state.page = data.page
        state.pages = data.pages
    }
}

const actions = {
    // 获取评论列表
    async fetchComments({ commit }, params) {
        try {
            const response = await getComments(params)
            commit('SET_COMMENTS', response)
        } catch (error) {
            console.error(error)
        }
    },
    // 添加评论
    async addComment({ dispatch }, commentData) {
        try {
            await addComment(commentData)
            // 重新获取评论列表
            dispatch('fetchComments', { articleId: commentData.articleId })
        } catch (error) {
            console.error(error)
        }
    },
    // 删除评论
    async deleteComment({ dispatch }, { id, articleId }) {
        try {
            await deleteComment(id)
            // 重新获取评论列表
            dispatch('fetchComments', { articleId })
        } catch (error) {
            console.error(error)
        }
    }
}

const getters = {
    comments: state => state.comments
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
