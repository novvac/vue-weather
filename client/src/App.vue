<template>
  <v-app>
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
    }
  },
})
</script>
