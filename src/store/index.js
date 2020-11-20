import Vue from 'vue';
import Vuex from 'vuex';
import { setCookies, getUserCookies } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于切换菜单的闭合状态 false: 不闭合 true 闭合
    collapsed: false,
    // 用户信息
    user: getUserCookies(),
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },

    loginOut(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        emali: '',
      };
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookies(userInfo);
    },
    loginOut({ commit }) {
      commit('loginOut');
    },
  },
  modules: {
  },
});
