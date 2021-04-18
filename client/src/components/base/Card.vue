<template>
    <v-card
        v-on="$listeners"
        v-bind="$attrs"
    >
        <slot/>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class BaseCard extends Vue {}
</script>