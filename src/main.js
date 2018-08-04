import Vue from 'vue';
import App from './App.vue';
import { store } from './store/Store';
import { router } from './router/router';


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
