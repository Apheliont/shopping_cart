<template>
  <li class="product-product-container">
    <div class="product-product-data-container">
      <router-link class="has-text-weight-bold" :to="product._id" append>{{ product.title }}</router-link>
      <p class="product-product-description">{{ product.description }}</p>
      <p class="product-product-price">
        <em>Цена за 1шт.:</em>
        <span class="has-text-weight-bold has-text-primary">
           <i class="fas fa-dollar-sign"></i>{{ product.price }}
        </span>
      </p>
      <button class="button button--add is-primary" @click="addProduct(product._id)">Добавить</button>
    </div>
    <div>
      <figure class="image is-128x128">
        <img :src="product.image_tag" :alt="product.title">
      </figure>
    </div>
  </li>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "ProductListItem",
    props: {
      product: {
        type: Object,
      }
    },
    methods: {
      ...mapActions(['addProduct'])
    }
  }
</script>

<style scoped>
  .product-product-container {
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid #e6e6e6;
    padding: 10px 20px;
  }

  .product-product-data-container {
    display: flex;
    flex-flow: column nowrap;
  }

  .product-product-description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .button--add {
    margin-top: 10px;
    align-self: flex-start;
  }

  .product-product-price {
    margin-top: 10px;
  }
</style>
