<template>
  <div class="column is-8 is-offset-2 product-container">
    <div class="product-title has-text-centered">
      <i class="fas fa-tshirt fa-2x"></i>
      <hr>
    </div>
    <ul>
      <app-product-list-item v-for="product in productItems" :product="product" :key="product._id" />
    </ul>
    <div class="product-quantity-container">
      <p>Всего товаров: <strong>{{ productQuantity }}</strong></p>
    </div>
    <app-pagination />
  </div>
</template>

<script>
  import Pagination from './Pagination';
  import ProductListItem from './ProductListItem';
  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';
  export default {
    name: "ProductList",
    components: {
      'app-product-list-item': ProductListItem,
      'app-pagination': Pagination
    },
    computed: {
      ...mapGetters(['productItems', 'productQuantity'])
    },
    methods: {
      ...mapActions(['getProductList'])
    },
    created() {
      this.getProductList(this.$route.query);
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

  .product-quantity-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    padding: 10px 20px;
  }
</style>
