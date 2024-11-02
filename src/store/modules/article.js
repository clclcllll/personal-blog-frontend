// src/store/modules/article.js

import { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } from '@/api/article'

const state = {
    articles: [],
    total: 0,
    page: 1,
    pages: 1,
    currentArticle: {}, // 存储当前文章
}

const mutations = {
    SET_ARTICLES(state, data) {
        state.articles = data.articles
        state.total = data.total
        state.page = data.page
        state.pages = data.pages
    },
    SET_CURRENT_ARTICLE(state, article) {
        state.currentArticle = article
    }
}

const actions = {
    // 获取文章列表
    async fetchArticles({ commit }, params) {
        try {
            const response = await getArticles(params)
            commit('SET_ARTICLES', response)
        } catch (error) {
            console.error(error)
        }
    },
    // 获取文章详情
    async fetchArticleById({ commit }, id) {
        try {
            const response = await getArticleById(id)
            console.log("完整的响应数据：", response); // 打印整个响应结构

            // 检查 response.data 是否存在
            if (response.article) {
                commit('SET_CURRENT_ARTICLE', response.article);
                console.log(response.article); // 检查数据结构
            } else {
                console.error("响应中缺少 data 或 article 属性");
            }

        } catch (error) {
            console.error("获取文章详情出错:", error);
        }
    },
    // 创建文章
    async createArticle({ dispatch }, articleData) {
        try {
            await createArticle(articleData)
            // 重新获取文章列表
            dispatch('fetchArticles')
        } catch (error) {
            console.error(error)
        }
    },
    // 更新文章
    async updateArticle({ dispatch }, { id, articleData }) {
        try {
            await updateArticle(id, articleData)
            // 重新获取文章详情
            dispatch('fetchArticleById', id)
        } catch (error) {
            console.error(error)
        }
    },
    // 删除文章
    async deleteArticle({ dispatch }, id) {
        try {
            await deleteArticle(id)
            // 重新获取文章列表
            dispatch('fetchArticles')
        } catch (error) {
            console.error(error)
        }
    }
}

const getters = {
    articles: state => state.articles,
    currentArticle: state => state.currentArticle
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
