<template>
  <div class="column is-4 is-offset-4">
    <form action="#" method="POST" @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Логин</label>
        <div class="control has-icons-right">
          <input class="input" type="text" placeholder="Логин" v-model="login">
        </div>
      </div>
      <div class="field">
        <label class="label">Пароль</label>
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="Пароль" v-model="password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control button-container">
          <button class="button is-danger" type="reset" style="margin-right: 10px;">
            Очистить
          </button>
          <button class="button is-success" :disabled="!isLoginAllowed">
            Вход
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
  import swal from 'sweetalert';
  import { mapActions } from 'vuex';
  export default {
    name: "Login",
    data() {
      return {
        login: '',
        password: ''
      }
    },
    computed: {
      isLoginAllowed() {
        return this.login.length > 0 && this.password.length > 0;
      }
    },
    methods: {
      ...mapActions(['saveToken', 'getCartList']),
      submitForm() {
        const userCredentials = {
          login: this.login,
          password: this.password
        };
        fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify(userCredentials)
        })
          .then(res => {
            if (res.ok) {
              res.json()
                .then(data => {
                  this.saveToken(data.token);
                  swal('Ура!', data.message, 'success')
                    .then(res => {
                      if (res) {
                        this.getCartList();
                        this.$router.push({name: 'home'});
                      }
                    });
                });
            } else {
              res.json()
                .then(data => {
                  swal('Вот блин...', data.message, 'error');
                });
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
</script>

<style scoped>
  .button-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    padding-top: 10px;
  }
</style>
