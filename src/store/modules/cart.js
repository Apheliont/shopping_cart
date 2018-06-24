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
        total += item.quantity * item.product.price;
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
      fetch('/cart')
        .then(res => {
          return res.json();
        })
        .then(data => {
          commit('UPDATE_CART_LIST', data);
        })
        .catch(error => {
          console.log(error);
        })
    },
    removeItem({commit}, payload) {
      fetch(`/cart/delete/${payload}`, {
        method: 'DELETE'
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
    addItem({commit}, payload) {
      fetch('/cart', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
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
    removeAll({commit}) {
      fetch('/cart/delete/all', {
        method: 'DELETE'
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
