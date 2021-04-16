<template>
    <v-main class="blue-grey lighten-5">
        <v-container
            fluid
            class="pa-16"
        >
            <v-row class="ma-0">
                <base-input
                    class="search-input white"
                    solo
                    flat
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                    placeholder="Search new place"
                />
            </v-row>

            <div class="my-10 display-1">
                Weather <b>Forecast</b>
            </div>
        </v-container>
    </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Main extends Vue {}
</script>

<style lang="scss">
.search-input {
    flex: .2 1 auto !important;
}
</style>