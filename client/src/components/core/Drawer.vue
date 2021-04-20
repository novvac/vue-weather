<template>
    <v-navigation-drawer
        app
        right
        :width="$vuetify.breakpoint.smAndDown ? '100%': '36%'"
        touchless
        class="pa-2 pa-md-10 pr-0 drawer secondary white--text"
        floating
        v-model="drawer && cities.length > 0"
    >
        <v-row class="ma-6 mr-md-16" align="center" justify="space-between">
            <v-btn large icon class="d-lg-none" @click="toggleDrawer(false)">
                <v-icon color="white">mdi-close</v-icon>
            </v-btn>
            <v-spacer/>
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

        <div class="d-flex justify-center py-md-16" v-if="!weatherData[activeCity]">
            <v-progress-circular indeterminate size="64" width="1" class="mx-auto"/>
        </div>
        <div class="ma-6 mr-md-16" v-else>
            <v-row class="ma-0" justify="center" align="center">
                <v-img :title="item.weather[0].description" :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`" width="72"/>
            
                <div class="text-center ml-2">
                    <span class="display-1 d-block">{{date("day")}}</span>
                    <span class="d-block body-2 mt-1">
                        {{date()}}
                    </span>
                </div>
            </v-row>

            <div class="d-flex justify-center" style="color: #ddd; font-size: 8rem; font-weight: 100;">
                <div v-if="activeDay === 0"> 
                    <span >{{item.temp.toFixed(1)}}</span>
                    <span class="text-h3 mt-10" style="color: #aaa">°C</span>
                </div>
                <div v-else class="text-h2 mt-8 mb-4 d-flex flex-column">
                    <div class="d-flex align-center">
                        <v-icon large class="mr-8" color="white">mdi-weather-sunny</v-icon>
                        {{item.temp.day.toFixed(1)}}°
                        <span class="body-1 ml-6">{{item.feels_like.day.toFixed(1)}}°C</span>
                    </div>
                    <div class="d-flex align-center mt-2">
                        <v-icon large class="mr-8" color="white">mdi-weather-night</v-icon>
                        {{item.temp.night.toFixed(1)}}°
                        <span class="body-1 ml-6">{{item.feels_like.night.toFixed(1)}}°C</span>
                    </div>
                </div>
            </div>

            <p class="body-1 text-center">
                {{cities[activeCity].city}}, {{cities[activeCity].country}}
            </p>

            <div class="text-center body-2">
                <span class="mx-3" v-if="activeDay === 0">
                    Feels like <b>{{item.feels_like.toFixed(1)}}</b>
                </span>
                <span class="mr-2 ml-6">
                    <v-icon class="mr-1" color='white'>mdi-weather-sunset-up</v-icon> {{time(item.sunrise * 1000)}}
                </span>
                <span class="ml-2">
                    <v-icon class="mr1" color="white">mdi-weather-sunset-down</v-icon> {{time(item.sunset * 1000)}}
                </span>
            </div>
            <div class="text-center body-2 mt-2">
                <span class="mx-3">
                    <v-icon class="mr-1" color="white">mdi-weight</v-icon> {{item.pressure}} hPa
                </span>

                <span class="mx-3">
                    <v-icon class="mr-1" color="white">mdi-weather-windy</v-icon> {{item.wind_speed.toFixed(1)}} m/s
                </span>
            </div>            
        </div>
        
        <weather-charts/>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import store from '../../store/index';
import WeatherCharts from '../accessed/WeatherCharts.vue';

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

@Component({
    components: {
        WeatherCharts
    }
})
export default class Drawer extends Vue {
    get drawer() { return store.getters.drawer }
    get cities() { return store.getters.cities }
    get activeCity() { return store.getters.activeCity }
    get activeDay() {return store.getters.activeDay }
    get weatherData() { return store.getters.weatherData }

    @Watch('activeCity')
    @Watch('activeDay')
    @Watch('weatherData')
    onDataChanged() {
        if(store.getters.weatherData) {
            if(store.getters.activeDay > 0)
                this.item = store.getters.weatherData[store.getters.activeCity].daily[store.getters.activeDay];
            else
                this.item = store.getters.weatherData[store.getters.activeCity].current;
        }
    }

    interval = null;
    item = null;

    date(mode) {
        let dt = new Date(this.item.dt * 1000);;

        if(mode === "day") {
            if(store.state.activeDay === 0)
                return "Now";
            else if(store.state.activeDay === 1)
                return "Yesterday";
            
            return WEEK_DAYS[dt.getDay()];
        }
        
        return `${WEEK_DAYS[dt.getDay()].slice(0,3)}, ${dt.getDate()} ${MONTHS[dt.getMonth()].slice(0,3)}`
    }
    time(dt) {
        let date = new Date(dt);
        return `${date.getHours()}:${date.getMinutes()}`;
    }
    toggleDrawer(value) {
        store.dispatch('TOGGLE_DRAWER', value);
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