<template>
  <v-app>
    <div class="handy-loader" v-show="handyLoader">
      <v-progress-circular size="24" indeterminate width="2"></v-progress-circular>
    </div>

    <router-view v-if="!(authenticated.isAuthenticated === null)"/>
    <div v-else class="d-flex justify-center align-center" style="height: 100%">
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
      return store.state;
    },
    handyLoader() {
      return store.state.handyLoader;
    }
  },
})
</script>

<style lang="scss">
html {
  position: relative;
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
</style>
