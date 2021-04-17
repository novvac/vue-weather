<template>
  <v-app>
    <router-view v-if="!loading"/>
    <div v-else class="d-flex justify-center align-center" style="height: 100%">
      <v-progress-circular indeterminate size="128" width="2"></v-progress-circular>
    </div>

    {{authenticated}}
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
  computed: {
    authenticated() {
      return store.state;
    }
  },
  created() {
    if(store.state.isAuthenticated === null) {
      this.$http.get("/api/user/")
        .then(res => {
          store.dispatch("SET_AUTHENTICATED", true);
          store.dispatch("SET_USER", res.data);
          this.loading = false;
        })
        .catch(err => {
          store.dispatch("SET_AUTHENTICATED", false);
          this.loading = false;
        })
    } else {
      this.loading = false;
    }
  }
})
</script>
