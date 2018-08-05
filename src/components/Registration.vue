<template>
  <div class="column is-4 is-offset-4">
    <form action="#" method="POST" @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Логин</label>
        <div class="control has-icons-right">
          <input class="input" type="text" placeholder="Логин" v-model="login">
          <span class="icon is-small is-right has-text-primary" v-if="isLoginCorrect">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Почта</label>
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Почта" v-model="email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right has-text-primary" v-if="isEmailCorrect">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Пароль</label>
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="Пароль" v-model="password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
          <span class="icon is-small is-right has-text-primary" v-if="isPasswordCorrect">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Подтверждение пароля</label>
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="...еще раз пароль" v-model="passwordConfirm">
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
          <button class="button is-success" :disabled="!isSubmitAllowed">
            Регистрация
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
  import swal from 'sweetalert';

  export default {
    name: "Registration",
    data() {
      return {
        login: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    },
    computed: {
      isEmailCorrect() {
        const regExp = /\w+@\w+\.\w{2,3}/i;
        return regExp.test(this.email);
      },
      isLoginCorrect() {
        const regExp = /[a-zа-яё]{3,}/i;
        return regExp.test(this.login);
      },
      isPasswordCorrect() {
        const regExp = /(\w|[@#$%^&*]){3,}/;
        return regExp.test(this.password) && this.password === this.passwordConfirm;
      },
      isSubmitAllowed() {
        return this.isEmailCorrect && this.isLoginCorrect && this.isPasswordCorrect;
      }
    },
    methods: {
      submitForm() {
        const user = {
          login: this.login,
          email: this.email,
          password: this.password
        };

        fetch('/api/user/register', {
          method: 'POST',
          body: JSON.stringify(user),
        })
          .then(res => {
            if (res.ok) {
              res.json()
                .then(data => {
                  swal('Ура!', data.message, 'success')
                    .then(res => {
                      if (res) {
                        this.$router.push({name: 'login'});
                      }
                    });
                })
            } else {
              res.json()
                .then(data => {
                  swal('Ой чтож такое...!', data.message, 'error')
                });
            }
          })
          .catch(error => {
            swal('Ой неет :(((', 'Сервер сошел с ума =(', 'error')
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
