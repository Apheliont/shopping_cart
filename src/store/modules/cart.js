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
    getCartList({commit}) {
      fetch('/api/user/cart')
        .then(res => {
          return res.json();
        })
        .then(data => {
          commit('UPDATE_CART_LIST', data);
        })
        .catch(err => {
          console.log(err);
        })
    },
    removeProduct({commit}, payload) {
      fetch(`/api/user/cart/delete/${payload}`, {
        method: 'DELETE'
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          commit('UPDATE_CART_LIST', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct({commit}, productId) {
      fetch('/api/user/cart', {
        method: 'POST',
        body: JSON.stringify({productId})
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          commit('UPDATE_CART_LIST', data)
        })
        .catch(err => {
          console.log(err)
        });
    },
    removeAll({commit}) {
      fetch('/api/user/cart/delete/all', {
        method: 'DELETE'
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          commit('UPDATE_CART_LIST', data)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
