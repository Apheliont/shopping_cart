<template>
  <article class="box column is-6 is-offset-3">
    <div class="loading" v-if="loading">
      <figure class="image is-128x128">
        <img src='/Spinner-1s-200px.svg' alt="Loading">
        <figcaption class="loading-caption has-text-centered">Загрузка...</figcaption>
      </figure>
    </div>
    <div class="notification is-danger" v-if="error">
      Ошибка...Товар не найден
    </div>
    <div class="product-item-container" v-if="product">
      <header class="product-item-header">
        <div class="product-item-title">
          <strong class="title">{{product.title}}</strong>
          <em>Материал: <strong class="tag product-item-type">{{product.product_type}}</strong></em>
          <em>Дата производства: <strong class="tag product-item-type">{{product.created_at}}</strong></em>
        </div>
        <figure class="image is-128x128">
          <img :src="product.image_tag"
               :alt="product.title">
        </figure>
      </header>
      <main>
        {{product.description}}
      </main>
      <footer class="product-item-footer">
        <strong class="product-item-price">
          <em>Цена за 1шт.:</em>
          <span class="has-text-weight-bold has-text-primary">
           <i class="fas fa-dollar-sign"></i>{{ product.price }}
        </span>
        </strong>
        <div class="checkout-container">
          <button class="button button--back is-outlined" @click="pageBack">Назад</button>
          <button class="button is-primary" @click="addProduct(product._id)">Добавить</button>
        </div>
      </footer>
    </div>
  </article>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "ProductItem",
    props: ['id'],
    data() {
      return {
        loading: false,
        product: null,
        error: null
      }
    },
    // watch: {
    //   '$route'() {
    //     this.fetchData();
    //   }
    // },
    methods: {
      ...mapActions(['addProduct']),

      pageBack() {
        window.history.back();
      },
      fetchData() {
        this.loading = true;
        this.product = this.error = null;
        this.$store.dispatch('getProductById', this.id)
          .then(res => {
            this.loading = false;
            if (!res.ok) {
              throw Error(res.statusText);
            }
            return res.json();
          })
          .then(data => {
            this.product = data;
          })
          .catch(err => {
            this.loading = false;
            this.error = err;
          });
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>

<style scoped>
  .box {
    padding: 20px !important;
  }

  .product-item-container {
    display: flex;
    flex-flow: column nowrap;
  }

  .product-item-title {
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 10px;
  }

  .product-item-type {
    align-self: flex-start;
  }

  .product-item-header {
    display: flex;
    flex-flow: row nowrap;
  }

  .product-item-footer {
    display: flex;
    flex-flow: column nowrap;
  }

  .checkout-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }

  .button--back {
    margin-right: 10px;
  }

  .product-item-price {
    margin-top: 10px;
  }

  .loading {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }

  .loading-caption {
    margin-top: -20px;
  }
</style>
