import Vue from 'vue';
import Vuex from 'vuex';

import { productModule } from './modules/product';
import { cartModule } from './modules/cart';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    productModule,
    cartModule
  }
});
