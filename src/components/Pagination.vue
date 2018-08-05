<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <!--Обход бага с disabled кнопками. Когда кнопка задизэблина но все равно срабатывает -->
    <a class="pagination-previous" @click.prevent="backwardPagination" :disabled="currentPage === 1">Назад</a>
    <a class="pagination-next" @click.prevent="forwardPagination" :disabled="currentPage === totalPageCount">Вперед</a>

    <ul class="pagination-list">
      <li>
        <router-link v-if="totalPageCount > 1"
                     class="pagination-link"
                     :class="{'is-current': currentPage === 1}"
                     aria-label="В начало"
                     :to="{name: 'products', query: {per_page: productsPerPage, page: 1}}">1
        </router-link>
      </li>
      <li><span class="pagination-ellipsis" v-if="leftEllipsis && totalPageCount > 1">&hellip;</span></li>
      <template v-if="totalPageCount > 1">
        <li v-for="page in pageGenerator">
          <router-link class="pagination-link"
                       :aria-label="'Страница №' + page"
                       :class="{'is-current': currentPage === page}"
                       :to="{name: 'products', query: {per_page: productsPerPage, page}}">{{page}}
          </router-link>
        </li>
      </template>
      <li><span class="pagination-ellipsis" v-if="rightEllipsis && totalPageCount > 1">&hellip;</span></li>
      <li>
        <router-link v-if="totalPageCount > 1"
                     class="pagination-link"
                     :class="{'is-current': currentPage === totalPageCount}"
                     aria-label="В конец"
                     :to="{name: 'products', query: {per_page: productsPerPage, page: totalPageCount}}">
          {{totalPageCount}}
        </router-link>
      </li>
      <li>
        <div class="select">
          <select name="per_page" id="per_page" :value="productsPerPage" @change="setProductsPerPage">
            <option value="5">По 5</option>
            <option selected value="10">По 10</option>
            <option value="20">По 20</option>
            <option value="50">По 50</option>
            <option value="100">По 100</option>
          </select>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    name: "Pagination",
    data() {
      return {
        leftEllipsis: false,
        rightEllipsis: false
      }
    },
    computed: {
      ...mapGetters(['totalPageCount', 'productsPerPage', 'currentPage']),
      pageGenerator() {
        this.leftEllipsis = this.rightEllipsis = false;
        const filteredPages = [];
        if (this.currentPage - 3 > 1) {
          this.leftEllipsis = true;
        }
        if (this.currentPage + 3 < this.totalPageCount) {
          this.rightEllipsis = true;
        }
        if (this.currentPage - 2 > 1) {
          filteredPages.push(this.currentPage - 2);
        }
        if (this.currentPage - 1 > 1) {
          filteredPages.push(this.currentPage - 1);
        }
        if (this.currentPage !== 1 && this.currentPage !== this.totalPageCount) {
          filteredPages.push(this.currentPage);
        }
        if (this.currentPage + 1 < this.totalPageCount) {
          filteredPages.push(this.currentPage + 1);
        }
        if (this.currentPage + 2 < this.totalPageCount) {
          filteredPages.push(this.currentPage + 2);
        }
        return filteredPages;
      },
    },
    methods: {
      ...mapActions(['getProductList']),
      setProductsPerPage(e) {
        const value = e.target.value;
        this.$store.commit('SET_PRODUCTS_PER_PAGE', value);
      },
      // Методы для обхода бага с пагинацией задизейбленых кнопок.
      // Кнопка задизейблина, но все равно срабатывает эвент
      forwardPagination() {
        if (this.currentPage < this.totalPageCount) {
          this.$router.push({name: 'products', query: {per_page: this.productsPerPage, page: this.currentPage + 1}});
        }
      },
      backwardPagination() {
        if (this.currentPage > 1) {
          this.$router.push({name: 'products', query: {per_page: this.productsPerPage, page: this.currentPage - 1}});
        }
      }
    },
    watch: {
      $route() {
        this.getProductList(this.$route.query);
      },
      productsPerPage() {
        this.$router.push({name: 'products', query: {per_page: this.productsPerPage}});
      }
    }
  }
</script>

<style scoped>

</style>
