<template>
  <div>
    <app-navbar/>
    <div class="container">
      <transition
        name="router-view"
        mode="out-in"
        enter-active-class="fadeInLeft animated"
        leave-active-class="fadeOutRight animated"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import appNavbar from './components/Navbar';

  export default {
    name: 'shopping card',
    components: {
      appNavbar
    },
    data() {
      return {}
    },

  }
</script>

<style lang="scss">
  .container {
    margin-top: 50px;
  }

  html {
    background-color: rgba(228, 255, 250, 0.58);
  }

  body {
    margin-bottom: 30px;
  }

  button:active {
    outline: none !important;
    border: none !important;
  }

  button:focus {
    outline: 0;
  }

  .animated {
    -webkit-animation-duration: 0.6s;
    -moz-animation-duration: 0.6s;
    animation-duration: 0.6s;
  }

</style>
