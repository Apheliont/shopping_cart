<template>
<div class="container">
  <div class="columns is-variable is-3">
    <app-cart-list />
    <app-product-list/>
  </div>
</div>
</template>

<script>
import ProductList from './components/ProductList';
import CartList from './components/CartList';

export default {
  name: 'shopping card',
  components: {
    'app-product-list': ProductList,
    'app-cart-list': CartList
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.container {
  margin-top: 50px;
}

  html {
    background-color: rgba(228, 255, 250, 0.58);
  }
</style>
