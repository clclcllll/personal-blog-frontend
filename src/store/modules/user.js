// src/store/modules/user.js

import { login, register,getUserProfile } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
    token: getToken(),
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {} // 初始化时从 sessionStorage 获取 userInfo
}

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo)) // 将 userInfo 保存到 sessionStorage
    },
    CLEAR_USER_INFO(state) {
        state.token = ''
        state.userInfo = {}
        sessionStorage.removeItem('userInfo') // 清除 sessionStorage 中的 userInfo
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
    // 用户注册
    async register(_, userData) {
        try {
            await register(userData)
            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    },
    // 用户注销
    logout({ commit }) {
        commit('CLEAR_USER_INFO')
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
            commit('CLEAR_USER_INFO')
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
