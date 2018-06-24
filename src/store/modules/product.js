export const productModule = {
  state: {
    productList: []
  },

  getters: {
    productItems(state) {
      return state.productList;
    }
  },

  mutations: {
    UPDATE_PRODUCT_LIST (state, payload) {
      state.productList = payload;
    }
  },

  actions: {
    getProductList ({commit}) {
      fetch('/products')
        .then(res => {
          return res.json();
        })
        .then(data => {
          commit('UPDATE_PRODUCT_LIST', data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
