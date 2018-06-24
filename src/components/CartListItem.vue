<template>
  <li class="cart-item-container">
       <div class="level">
      <div class="level-left">
        <div class="level-item cart-item-description">
          <p class="has-text-weight-bold">{{ item.product.title }}</p>
          <p class="has-text-weight-bold has-text-primary">
            <i class="fas fa-dollar-sign"></i>{{ item.product.price }} каждый
          </p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item cart-item-description">
          <div class="set-quantity-container has-text-right">
            <i class="fas fa-arrow-circle-up" @click="addItem(item)"></i>
            <i class="fas fa-arrow-circle-down" @click="removeItem(item._id)"></i>
          </div>
         <p>
           Количество: {{item.quantity}}
         </p>
        </div>
      </div>
    </div>

  </li>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: "CartListItem",
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      ...mapActions(['addItem', 'removeItem'])
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
    align-self: flex-end;
  }
</style>
