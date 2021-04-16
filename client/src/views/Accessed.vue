<template>
  <div class="accessed">
    <!-- Application right navigation drawer -->
    <Drawer/>

    <!-- Accessed content (cities etc.) -->
    <Main/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Drawer from '../components/core/Drawer.vue'
import Main from '../components/core/Main.vue'

@Component({
  components: {
    Drawer,
    Main,
  }
})
export default class Accessed extends Vue {}
</script>

<style lang="scss">
.accessed, .v-main {
  height: 100%;
}
</style>