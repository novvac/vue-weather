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

            <div class="mt-10 mb-12 display-1">
                Weather <b>Forecast</b>
            </div>

            <v-row class="ma-0 cities">
                <city-card
                    v-for="item in cities"
                    :key="item.city"
                    :city="item"
                    class="mr-12 d-block"
                />
            </v-row>

            <div class="mt-10">
                <v-row class="ma-0">
                    <base-button
                        v-for="(item, i) in periods"
                        :key="item.text"
                        large
                        class="mr-10 text-none body-2 elevation-0"
                        :color="activePeriod === i ? 'primary' : null"
                        @click="changePeriod(i)"
                    >
                        {{item.text}}
                    </base-button>
                </v-row>

                noice
            </div>
        </v-container>
    </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import CityCard from '../accessed/CityCard.vue';

@Component({
    components: {
        CityCard,
    }
})
export default class Main extends Vue {
    cities = [
        {
            src: "https://i.pinimg.com/originals/21/eb/1f/21eb1f1de25367847e8b41a9149db65a.jpg",
            city: "Paris",
            country: "France"
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/8/82/London_Big_Ben_Phone_box.jpg",
            city: "London",
            country: "UK"
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/8/82/London_Big_Ben_Phone_box.jpg",
            city: "London",
            country: "UK"
        },
    ];
    activePeriod = 0;
    periods =  [
        {
            text: "Week"
        },
        {
            text: "Month"
        },
        {
            text: "3 month"
        },
        {
            text: "6 month"
        }
    ];

    changePeriod(index) {
        this.activePeriod = index;
    }
}
</script>

<style lang="scss">
.search-input {
    flex: .2 1 auto !important;
}
.cities {
    max-width: calc(100% - 160px - 1rem);

    .city-card {
        &:last-child {
            margin-right: 0 !important;
        }
    }
}
</style>