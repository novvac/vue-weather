<template>
  <v-app>
    <router-view v-if="!loading"/>
    <div v-else class="d-flex justify-center align-center" style="height: 100%">
      <v-progress-circular indeterminate size="128" width="2"></v-progress-circular>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import store from './store/index';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      loading: true,
    }
  },
  created() {
    if(store.state.isAuthenticated === undefined) {
      this.$http.get("/api/user/")
        .then(res => {
          console.log(res);
          this.loading = false;
        })
        .catch(err => {
          console.log(err.response);
          this.loading = false;
        })
    } else {
      this.loading = false;
    }
  }
})
</script>
