// store/modules/ui.js

const state = {
    hideNav: false, // 控制导航栏的隐藏状态
};

const mutations = {
    SET_HIDE_NAV(state, value) {
        state.hideNav = value;
    },
};

const actions = {
    updateHideNav({ commit }, value) {
        commit('SET_HIDE_NAV', value);
    },
};

const getters = {
    hideNav: (state) => state.hideNav,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
