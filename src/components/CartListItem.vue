<template>
  <li class="cart-item-container">
    <div class="level">
      <div class="level-left">
        <div class="level-item cart-item-description">
          <router-link :to="/products/+item._id" class="has-text-weight-bold has-text-left cart-item-title">{{ item.title }}</router-link>
          <div>
            <span class="has-text-left set-quantity-container">
              <i class="fas fa-arrow-circle-down" @click="removeProduct(item._id)"></i>
              <i class="fas fa-arrow-circle-up" @click="addProduct(item._id)"></i>
            </span>
            <span class="has-text-weight-bold has-text-primary cart-item-price">
              <i class="fas fa-dollar-sign"></i>
              {{ item.price }} x {{ item.quantity }} = <i class="fas fa-dollar-sign"></i>
              {{ item.price * item.quantity}}
            </span>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <figure class="image is-64x64">
            <img :src="item.image_tag" :alt="item.title">
          </figure>
        </div>
      </div>
    </div>

  </li>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "CartListItem",
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      ...mapActions(['addProduct', 'removeProduct'])
    }
  }
</script>

<style scoped>
  .cart-item-description {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
  }

  .cart-item-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    padding: 10px 20px;
  }

  .set-quantity-container {
    display: inline-block;
    min-width: 70px;
  }

  .cart-item-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 350px;
    margin-bottom: 10px;
  }

  .cart-item-price {
    display: inline-block;
    text-align: left;
  }
</style>
