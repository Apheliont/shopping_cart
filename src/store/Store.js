import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../router/router';
import { productModule } from './modules/product';
import { cartModule } from './modules/cart';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: window.localStorage.getItem('auth') || '',
    serverAuthorizeResponse: true
  },
  getters: {
    tokenHeader(state) {
      return new Headers({
        Authorization: `JWT ${state.token}`,
        'Content-Type': 'application/json'
      });
    },
    isLoggedIn(state) {
      return state.token && state.serverAuthorizeResponse;
    }
  },
  mutations: {
    SAVE_TOKEN(state, payload) {
      window.localStorage.setItem('auth', payload);
      state.token = payload;
    },
    SIGN_OUT(state) {
      window.localStorage.removeItem('auth');
      state.token = '';
      state.cartModule.cartList = [];
      router.push({name: 'login'});
    },
    SET_SERVER_AUTHORIZE_RESPONSE(state, payload) {
      state.serverAuthorizeResponse = payload;
    }
  },
  actions: {
    saveToken({commit}, payload) {
      commit('SAVE_TOKEN', payload);
    },
    signOut({commit}) {
      commit('SIGN_OUT');
    }
  },
  modules: {
    productModule,
    cartModule
  }
});
