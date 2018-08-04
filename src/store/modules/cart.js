export const cartModule = {
  state: {
    cartList: []
  },

  getters: {
    cartItems(state) {
      return state.cartList;
    },
    totalPrice(state) {
      let total = 0;
      state.cartList.forEach(item => {
        total += item.quantity * item.price;
      });
      return total.toFixed(2);
    },
    totalQuantity(state) {
      let total = 0;
      state.cartList.forEach(item => {
        total += item.quantity;
      });
      return total;
    }
  },

  mutations: {
    UPDATE_CART_LIST(state, payload) {
      state.cartList = payload;
    }
  },

  actions: {
    getCartList({commit, rootGetters}) {
      fetch('/api/user/cart', {
        headers: rootGetters.tokenHeader
      })
        .then(res => {
          if (res.status >= 400) {
            commit('SET_SERVER_AUTHORIZE_RESPONSE', false);
            return new Error('Доступа нету');
          } else {
            commit('SET_SERVER_AUTHORIZE_RESPONSE', true);
            return res.json();
          }
        })
        .then(data => {
          commit('UPDATE_CART_LIST', data);
        })
        .catch(error => {
          console.log(error);
        })
    },
    removeProduct({commit, rootGetters}, payload) {
      fetch(`/api/user/cart/delete/${payload}`, {
        method: 'DELETE',
        headers: rootGetters.tokenHeader
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            return Promise.reject(new Error(res.statusText));
          }
        })
        .then(data => {
          commit('UPDATE_CART_LIST', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addProduct({commit, rootGetters}, productId) {
      fetch('/api/user/cart', {
        method: 'POST',
        headers: rootGetters.tokenHeader,
        body: JSON.stringify({productId})
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            return Promise.reject(new Error(res.statusText));
          }
        })
        .then(data => {
          commit('UPDATE_CART_LIST', data)
        })
        .catch(error => {
          console.log(error)
        });
    },
    removeAll({commit, rootGetters}) {
      fetch('/api/user/cart/delete/all', {
        method: 'DELETE',
        headers: rootGetters.tokenHeader
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            return Promise.reject(new Error(res.statusText));
          }
        })
        .then(data => {
          commit('UPDATE_CART_LIST', data)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
