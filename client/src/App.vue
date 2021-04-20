<template>
  <v-app>
    <!-- Instance of global handy loader -->
    <div class="handy-loader" v-show="handyLoader">
      <v-progress-circular size="24" indeterminate width="2"></v-progress-circular>
    </div>

    <!-- store.state.isAuthenticated must be boolean -->
    <!-- if it is 'null' - page was refreshed and user is not set up yet -->
    <router-view v-if="authenticated !== null"/>
    <div v-else class="d-flex justify-center align-center" style="height: 100%">
      <!-- if store.state.isAuthenticated === null -> user not set up yet, show loading screen -->
      <v-progress-circular indeterminate size="96" width="1"></v-progress-circular>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import store from './store/index';

export default Vue.extend({
  name: 'App',
  computed: {
    authenticated() {
      return store.getters.isAuthenticated;
    },
    handyLoader() {
      return store.state.handyLoader;
    }
  },
  watch: {
    authenticated(val, oldVal) {
      // IF authenticated === false AND previous authenticated value === true
      // user was logout, push user to authorization page
      if(!val && oldVal) {
        this.$router.push("/authorization")
      }
    }
  }
})
</script>

<style lang="scss">
html {
  position: relative;

  ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #1f222f;
    }
    
    ::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,.2);
    }
}
.handy-loader {
  position: fixed;
  bottom: 1.63rem;
  right: 1.63rem;
  z-index: 999;
  background: #f7f7f7;
  padding: 1rem;
  border-radius: 50%;
}
.v-input {
    flex: none;
}
</style>
