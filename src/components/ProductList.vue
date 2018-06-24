<template>
  <div class="column is-8 product-container">
    <div class="product-title has-text-centered">
      <i class="fas fa-user-circle fa-2x"></i>
      <hr>
    </div>
    <ul>
      <app-product-list-item v-for="item in productItems" :item="item" :key="item._id" />
    </ul>
  </div>
</template>

<script>
  import ProductListItem from './ProductListItem';
  import { mapGetters } from 'vuex';
  export default {
    name: "ProductList",
    components: {
      'app-product-list-item': ProductListItem
    },
    computed: {
      ...mapGetters(['productItems'])
    },
    created() {
      this.$store.dispatch('getProductList');
    }
  }
</script>

<style scoped>
  .product-container {
    border: 1px solid rgba(196, 196, 196, 0.81);
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    padding-bottom: 20px;
  }
  .product-title {
    margin: 10px 0 20px 0;
  }
</style>
