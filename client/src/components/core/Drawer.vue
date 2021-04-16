<template>
    <v-navigation-drawer
        app
        right
    >
        <slot/>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Drawer extends Vue {
    name: "Drawer"
}
</script>