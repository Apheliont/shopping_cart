<template>
  <nav class="navbar navbar--custom">
    <div class="navbar-start">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control" v-if="!isLoggedIn">
            <router-link class="button" to="/login">
              <span class="icon">
                 <i class="fas fa-sign-in-alt"></i>
              </span>
              <span>
               Войти
              </span>
            </router-link>
          </p>
          <p class="control" v-if="isLoggedIn">
            <button class="button" @click="signOut">
              <span class="icon">
                 <i class="fas fa-sign-out-alt"></i>
              </span>
              <span>
               Выйти
              </span>
            </button>
          </p>
          <p class="control" v-if="!isLoggedIn">
            <router-link class="button" to="/registration">
              <span class="icon">
                <i class="fas fa-user-plus"></i>
              </span>
              <span>
                Регистрация
              </span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <router-link class="button" :to="{name: 'products', query: {per_page: productsPerPage, page: currentPage}}"
                         exact :disabled="!isLoggedIn">
              <span class="icon">
                <i class="fas fa-tshirt"></i>
              </span>
              <span>
                Магазин
              </span>
            </router-link>
          </p>
          <p class="control">
            <router-link class="button is-primary" to="/cart" :disabled="!isLoggedIn">
              <span class="icon">
                <i class="fas fa-shopping-cart"></i>
              </span>
              <span>Корзина {{ totalQuantity }}</span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';
  export default {
    name: "Navbar",
    computed: {
      ...mapGetters(['totalQuantity', 'productsPerPage', 'currentPage', 'isLoggedIn'])
    },
    methods: {
      ...mapActions(['signOut']),
    },
    created() {
      this.$store.dispatch('getCartList');
    }
  }
</script>

<style scoped>
  .navbar--custom {
    background-color: transparent;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
  }

</style>
