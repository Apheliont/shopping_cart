export const productModule = {
  state: {
    productList: [],
    totalCount: 0,
    totalPageCount: 1,
    currentPage: 1,
    productsPerPage: 10
  },

  getters: {
    productItems(state) {
      return state.productList;
    },
    productQuantity(state) {
      return state.totalCount;
    },
    totalPageCount(state) {
      return state.totalPageCount;
    },
    productsPerPage(state) {
      return state.productsPerPage;
    },
    currentPage(state) {
      return state.currentPage;
    }
  },

  mutations: {
    UPDATE_PRODUCT_LIST(state, payload) {
      state.productList = payload;
    },
    SET_TOTAL_COUNT(state, payload) {
      const totalCount = parseInt(payload);
      if (Number.isInteger(totalCount)) {
        state.totalCount = totalCount;
      }
    },
    SET_TOTAL_PAGE_COUNT(state, payload) {
      const totalPageCount = parseInt(payload);
      if (Number.isInteger(totalPageCount)) {
        state.totalPageCount = totalPageCount;
      }
    },
    SET_PRODUCTS_PER_PAGE(state, payload) {
      const productsPerPage = parseInt(payload);
      if (Number.isInteger(productsPerPage)) {
       state.productsPerPage = productsPerPage;
      }
    },
    SET_CURRENT_PAGE(state, payload) {
      const currentPage = parseInt(payload);
      if (Number.isInteger(currentPage)) {
        state.currentPage = currentPage;
      }
    }
  },

  actions: {
    getProductList({commit, rootGetters, rootMutations}, query = {per_page: 10, page: 1}) {
      // Парсим строку запроса чтобы отправить ее методе fetch
      const queryKeys = Object.keys(query);
      const maxLength = queryKeys.length;
      let url = '/api/products';
      let queryStringArr = [];
      for (let i = 0; i < maxLength; i++) {
        if (queryKeys[i] === 'page' || queryKeys[i] === 'per_page') {
          queryStringArr.push(queryKeys[i] + '=' + query[queryKeys[i]]);
        }
      }
      if (queryStringArr.length > 0) {
        url += '?' + queryStringArr.join('&');
      }

      fetch(url, {
        method: 'GET',
        headers: rootGetters.tokenHeader
      })
        .then(res => {
          if (res.status >= 400) {
            commit('SET_SERVER_AUTHORIZE_RESPONSE', false);
            return new Error('Unauthorized');
          } else {
            commit('SET_SERVER_AUTHORIZE_RESPONSE', true);
            // Устанавливаем общее число товаров, количество страниц и текущую страницу
            commit('SET_TOTAL_COUNT', res.headers.get('X-Total-Count'));
            commit('SET_TOTAL_PAGE_COUNT', res.headers.get('X-Paging-PageCount'));
            commit('SET_CURRENT_PAGE', res.headers.get('X-Paging-CurrentPage'));
            return res.json();
          }
        })
        .then(data => {
          commit('UPDATE_PRODUCT_LIST', data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProductById({commit, rootGetters}, id) {
      return fetch('/api/products/' + id, {
        headers: rootGetters.tokenHeader
      });
    }
  }
};
