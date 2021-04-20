<template>
    <v-main class="main blue-grey lighten-5">
        <v-container
            fluid
            class="pa-4 pa-sm-8 pa-md-16"
        >
            <v-row class="ma-0" justify="space-between" align="center">
                <base-input
                    class="search-input white"
                    solo
                    flat
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                    placeholder="Search new place"
                    v-model="search.value"
                    @keyup.enter="searchPlace()"
                    :style="{width: $vuetify.breakpoint.smAndDown ? '100%' : 'auto'}"
                />

                <div 
                    class="mt-5 mt-md-0 d-flex justify-space-around align-center"
                    :style="{width: $vuetify.breakpoint.smAndDown ? '100%' : 'auto'}"
                >
                    <base-button
                        large icon 
                        color="primary" 
                        @click="logout()"
                        class="mr-3"
                    >
                        <v-icon>mdi-logout</v-icon>
                    </base-button>

                    <base-button
                        large icon 
                        color="primary" 
                        @click="toggleDrawer()"
                        :disabled="cities.length === 0"
                    >
                        <v-icon v-if="!drawer">mdi-arrow-left</v-icon>
                        <v-icon v-else>mdi-arrow-right</v-icon>
                    </base-button>
                </div>
            </v-row>

            <div class="mt-10 mb-12 display-1 primary--text text-center text-md-left">
                Weather <b>Forecast</b>
            </div>

            <v-slide-group show-arrows>
                <v-slide-item
                    v-for="(item, i) in cities"
                    :key="item.id"
                >
                    <city-card
                        :city="item"
                        :class="['mr-8', 'ml-2', i === parseInt(activeCity) ? 'active' : undefined]"
                        @click="setActiveCity(i)"
                    />
                </v-slide-item>

                <v-slide-item>
                    <add-city @click="search.dialog = true"/>
                </v-slide-item>
            </v-slide-group>

            <div class="mt-10" v-if="cities.length > 0">
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

                <week-weather :items="weatherData[activeCity] ? weatherData[activeCity].daily : []"/>
            </div>
            <div v-else class="text-left mt-10">
                <b>Nie dodałeś/aś jeszcze żadnego miasta!</b>
            </div>

            <v-dialog 
                v-model="search.dialog" 
                max-width="1200" 
                persistent
                content-class="elevation-0"
            >
                <base-card class="px-8 py-5" rounded="24">
                    <v-row class="ma-0" align="center" justify="space-between">
                        <span class="font-weight-bold body-2">City search</span>

                        <base-button icon @click="search.dialog=false">
                            <v-icon>mdi-close</v-icon>
                        </base-button>
                    </v-row>

                    <v-divider class="mt-2 mb-5"></v-divider>

                    <base-input
                        class="search-input white mb-5"
                        solo-inverted
                        flat
                        prepend-inner-icon="mdi-magnify"
                        hide-details
                        placeholder="Search new place"
                        v-model="search.value"
                        @keyup.enter="searchPlace()"
                    />

                    <div 
                        v-if="search.loading"
                        class='d-flex justify-center py-10'
                    >
                        <v-progress-circular indeterminate width="1"/>
                    </div>
                    <div v-else>
                        <v-data-table
                            v-model="search.selected"
                            hide-default-footer
                            no-data-text="No items were found"
                            :items="search.items"
                            :headers="headers"
                            :single-select="true"
                            show-select
                        >
                            <template v-slot:item.actions="{ item }">
                                <base-button icon small :href="`https://maps.google.com/?q=${Object.values(item.coord)}&ll=${Object.values(item.coord)}&z=10`" target='_blank'>
                                    <v-icon
                                        small
                                    >
                                        mdi-map-marker
                                </v-icon>
                                </base-button>
                            </template>

                            <template v-slot:item.weather_icon="{ item }">
                                <v-img :title="item.weather[0].description" :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`" width="42" class="mx-auto"/>
                            </template>
                        </v-data-table>

                        <v-divider></v-divider>

                        <v-row class="ma-0" justify="center">
                            <base-button
                                text
                                class="mt-3"
                                color="primary"
                                :disabled="search.selected.length === 0"
                                @click="addCity()"
                            >
                                Save city
                            </base-button>
                        </v-row>
                    </div>
                </base-card>
            </v-dialog>
        </v-container>
    </v-main>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import { cloneDeep } from 'lodash';
import * as i18nIsoCountries from 'i18n-iso-countries';
i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
import store from '../../store/index';

import CityCard from '../accessed/CityCard.vue';
import AddCity from '../accessed/AddCity.vue';
import WeekWeather from '../accessed/WeekWeather.vue';

@Component({
    components: {
        CityCard,
        AddCity,
        WeekWeather,
    }
})
export default class Main extends Vue {
    model = null;
    search = {
        value: "",
        dialog: false,
        loading: false,
        items: [],
        selected: [],
    }
    headers = [
        {text: "Nazwa", sortable: false, align: "center", value: 'name'},
        {text: "Weather", sortable: false, align: "center", value: 'weather_icon'},
        {text: "Country", sortable: false, align: "center", value: 'sys.country'},
        {text: "Temp (C°)", sortable: false, align: "center", value: 'main.temp'},
        {text: "Lat", sortable: false, align: "center", value: 'coord.lat'},
        {text: "Lon", sortable: false, align: "center", value: 'coord.lon'},
        {text: "Actions", sortable: false, align: "center", value: 'actions'},
    ];
    activePeriod = 0;
    periods =  [
        {
            text: "Week"
        },
    ];

    get drawer() {
        return store.getters.drawer;
    }

    get cities() {
        return store.getters.cities;
    }

    get activeCity() {
        return store.getters.activeCity;
    }

    get weatherData() {
        return store.getters.weatherData;
    }

    @Watch('search.loading')
    onSearchDialogChanged(val: boolean) {
        if(val) {
            this.search.selected = [];
        }
    }

    changePeriod(index) {
        this.activePeriod = index;
    }

    searchPlace() {
        this.search.dialog = true;
        this.search.loading = true;
        this.$http.get(`https://openweathermap.org/data/2.5/find?&q=${this.search.value}&type=like&sort=population&cnt=30&appid=439d4b804bc8187953eb36d2a8c26a02&_=${Date.now()}`)
            .then(res => {
                let list = res.data.list;
                list.map(el => {
                    el.main.temp = (parseFloat(el.main.temp) - 273.15).toFixed(1);
                    el.sys.country = i18nIsoCountries.getName(el.sys.country, "en", {select: "official"});
                    return el;
                })

                this.search.items = list;
                this.search.loading = false;
            })
            .catch(err => {
                console.log(err.response);
                this.search.loading = false;
            })
    }

    addCity() {
        const obj = cloneDeep(this.search.selected[0]);
        let names = i18nIsoCountries.getNames("en", {select: 'official'});
        
        if(obj.sys.country.length > 8) {
            const index = Object.values(names).findIndex(el => {return el === obj.sys.country});
            obj.sys.country = Object.keys(names)[index];
        }

        this.search.loading = true;

        store.dispatch("ADD_CITY", {
            id: obj.id, 
            city: obj.name, 
            country: obj.sys.country,
            coord: obj.coord
        }).then(() => {
            this.search = {
                value: "",
                dialog: false,
                loading: false,
                items: [],
                selected: [],
            }
        })
    }

    setActiveCity(id) {
        store.dispatch("SET_ACTIVE_CITY", id);
    }
    toggleDrawer() {
        store.dispatch("TOGGLE_DRAWER");
    }
    logout() {
        store.dispatch("LOGOUT");
    }
}
</script>

<style lang="scss">
.search-input {
    flex: .2 1 auto !important;
}
.cities {
    overflow: hidden;
}
.v-data-table td {
    padding: 0 !important;
    border-bottom: 0 !important;
}
</style>