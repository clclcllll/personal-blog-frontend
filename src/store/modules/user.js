// src/store/modules/user.js

import { login, getUserProfile } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
    token: getToken(),
    userInfo:{} // 默认值设置为空对象
}

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo
    }
}

const actions = {
    // 用户登录
    async login({ commit }, userData) {
        try {
            const response = await login(userData)
            const { token, user } = response
            commit('SET_TOKEN', token)
            setToken(token)
            commit('SET_USER_INFO', user)
            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    },
    // 用户注销
    logout({ commit }) {
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', null)
        removeToken()
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        try {
            const response = await getUserProfile()
            const { user } = response
            commit('SET_USER_INFO', user)
        } catch (error) {
            // 获取用户信息失败，清除 token
            commit('SET_TOKEN', '')
            commit('SET_USER_INFO', null)
            removeToken()
        }
    }
}

const getters = {
    isAuthenticated: state => !!state.token,
    userInfo: state => state.userInfo
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
