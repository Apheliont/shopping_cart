<template>
  <li class="product-item-container">
    <div class="product-item-title">
      <div>
        <p class="has-text-weight-bold">{{ item.title }}</p>
      </div>
      <div>
        <button class="button is-primary" @click="addItem(item)">Добавить</button>
      </div>
    </div>
    <p>{{ item.description }}</p>
    <p class="has-text-weight-bold has-text-primary"><i class="fas fa-dollar-sign"></i>{{ item.price }}</p>
  </li>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: "ProductListItem",
    props: {
      item: {
        type: Object,
      }
    },
    methods: {
      ...mapActions(['addItem'])
    }
  }
</script>

<style scoped>
  .product-item-title {
     display: flex;
     flex-flow: row nowrap;
     justify-content: space-between;
   }
  .product-item-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    padding: 10px 20px;
  }
</style>
