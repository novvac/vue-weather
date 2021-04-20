<template>
    <v-navigation-drawer
        app
        right
        width="36%"
        class="pa-10 pr-0 drawer secondary white--text"
        floating
        v-model="drawer && cities.length > 0"
    >
        <v-row class="ma-6 mr-16" align="center" justify="space-between">
            <v-spacer></v-spacer>
            <v-badge
                color="red"
                offset-x="8"
                offset-y="8"
            >
                <v-avatar
                    rounded
                    size="56"
                >
                    <v-img src="https://avatarfiles.alphacoders.com/235/thumb-235557.png"/>
                </v-avatar>
            </v-badge>
        </v-row>

        <div class="d-flex justify-center py-16" v-if="!weatherData[activeCity]">
            <v-progress-circular indeterminate size="64" width="1" class="mx-auto"/>
        </div>
        <div class="ma-6 mr-16" v-else>
            <v-row class="ma-0" justify="center" align="center">
                <v-img :title="item.current.weather[0].description" :src="`http://openweathermap.org/img/wn/${item.current.weather[0].icon}@4x.png`" width="72"/>
            
                <div class="text-center ml-2">
                    <span class="display-1 d-block">Today</span>
                    <span class="d-block body-2 mt-1">
                        {{date}}
                    </span>
                </div>
            </v-row>

            <div class="d-flex justify-center" style="color: #ddd; font-size: 8rem; font-weight: 100;">
                {{item.current.temp.toFixed(1)}}
                <span class="text-h3 mt-10" style="color: #aaa">°C</span>
            </div>

            <p class="body-1 text-center">
                {{cities[activeCity].city}}, {{cities[activeCity].country}}
            </p>

            <div class="text-center body-2">
                <span class="mx-3">
                    Feels like <b>{{item.current.feels_like.toFixed(1)}}</b>
                </span>
                <span class="mr-2 ml-6">
                    <v-icon class="mr-1" color='white'>mdi-weather-sunset-up</v-icon> {{time(item.current.sunrise * 1000)}}
                </span>
                <span class="ml-2">
                    <v-icon class="mr1" color="white">mdi-weather-sunset-down</v-icon> {{time(item.current.sunset * 1000)}}
                </span>
            </div>
            <div class="text-center body-2 mt-2">
                <span class="mx-3">
                    <v-icon class="mr-1" color="white">mdi-weight</v-icon> {{item.current.pressure}} hPa
                </span>

                <span class="mx-3">
                    <v-icon class="mr-1" color="white">mdi-weather-windy</v-icon> {{item.current.wind_speed.toFixed(1)}} m/s
                </span>
            </div>            
        </div>
        
        <weather-charts/>
    </v-navigation-drawer>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import store from '../../store/index';
import WeatherCharts from '../accessed/WeatherCharts.vue';

const WEEK_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']

@Component({
    components: {
        WeatherCharts
    }
})
export default class Drawer extends Vue {
    get drawer() { return store.getters.drawer }
    get cities() { return store.getters.cities }
    get activeCity() { return store.getters.activeCity }
    get weatherData() { return store.getters.weatherData }

    interval = null;

    get item() {
        return this.weatherData[this.activeCity];
    }
    get date() {
        let dt = new Date(this.item.current.dt * 1000);
        return `${WEEK_DAYS[dt.getDay()]}, ${dt.getDate()} ${MONTHS[dt.getMonth()]}`
    }
    time(dt) {
        let date = new Date(dt);
        return `${date.getHours()}:${date.getMinutes()}`;
    }
}
</script>

<style lang="scss">
.drawer {
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: rgba(0,0,0,.25);
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,.5);
    }

    .drawer-option {
        &:last-child {
            margin-right: 0 !important;
        }
    }

    .v-image.v-responsive {
        flex: 0 0 auto !important;
    }

    .v-badge__badge {
        min-width: 0;
        min-height: 0;
        width: 1rem !important;
        height: 1rem !important;
        border-radius: 50% !important;
    }
}
</style>