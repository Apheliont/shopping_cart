<template>
  <div class="column is-6 is-offset-3 has-text-centered cart-container">
    <div class="cart-title">
      <i class="fas fa-shopping-cart fa-2x"></i>
    </div>
    <hr>
    <transition-group
      enter-active-class="fadeInUp animated"
      leave-active-class="fadeOutDown animated"
      tag="ul"
    >
      <app-cart-list-item v-for="item in cartItems" :key="item._id" :item="item"/>
    </transition-group>
    <div class="total-section">
      <div class="total-stats">
        <p class="total-quantity">Всего товаров:<strong> {{totalQuantity}}</strong></p>
        <p>Общая стоимость: <i class="fas fa-dollar-sign"></i> <strong>{{totalPrice}}</strong></p>
      </div>
      <div>
        <button class="button is-danger level-item" @click="removeAll" :disabled="totalQuantity === 0">
          <i class="fas fa-trash-alt remove-all-icon"></i>Удалить все
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import CartListItem from './CartListItem';
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    name: "CartList",
    components: {
      'app-cart-list-item': CartListItem
    },
    computed: {
      ...mapGetters(['cartItems', 'totalPrice', 'totalQuantity'])
    },
    methods: {
      ...mapActions(['removeAll'])
    }
  }
</script>

<style scoped>
  .cart-container {
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid rgba(196, 196, 196, 0.81);
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    padding-bottom: 20px;
    margin-right: 20px;
  }

  .total-stats {
    display: flex;
    flex-flow: column nowrap;
    align-items: start;
  }

  .total-section {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 20px;
    padding: 5px 20px;
  }

  .total-quantity {
    margin-bottom: 10px;
  }

  .cart-title {
    margin-top: 10px;
    padding-bottom: 10px;
  }

  .remove-all-icon {
    margin-right: 10px;
  }

</style>
