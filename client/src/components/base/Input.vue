<template>
    <v-text-field
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class BaseInput extends Vue {}
</script>