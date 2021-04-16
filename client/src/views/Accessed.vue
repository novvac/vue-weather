<template>
  <div class="accessed">
    <Drawer>
      Right drawer
    </Drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Drawer from '../components/core/Drawer.vue'

@Component({
  components: {
    Drawer,
  }
})
export default class Home extends Vue {
  
}
</script>
