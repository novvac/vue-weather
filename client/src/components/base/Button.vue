<template>
    <v-btn
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot/>
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Button extends Vue {}
</script>