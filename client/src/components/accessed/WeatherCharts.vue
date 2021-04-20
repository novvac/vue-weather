<template>
    <div class="mr-md-16 mx-3" v-if="weatherData.length > 0">
        <div v-if="weatherData[activeCity] && activeDay === 0">
            <p class="mt-16 overline">Precipitation for the next hour</p>
            <apexchart
                type="bar" 
                :options="{
                    ...options,
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return `${value.toFixed(2)} mm`;
                            }
                        },
                    },
                    xaxis: {
                        labels: {
                            show: false,
                        },
                        categories: next60minutes
                    }
                }" 
                :series="[{
                    name: 'Precipitation (mm)',
                    data: weatherData[activeCity].minutely.map(el => el.precipitation.toFixed(2)).splice(0,60)
                }]"
            />
        </div>

        <div v-if="weatherData[activeCity] && [0,1].includes(activeDay)">
            <p class="mt-16 overline">Temperature for the next 48h</p>
            <apexchart
                type="area" 
                :options="{
                    ...options,
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return `${value.toFixed(1)} °C`;
                            }
                        },
                    },
                    xaxis: {
                        labels: {
                            show: false,
                        },
                        categories: next48h
                    }
                }" 
                :series="[{
                    name: 'Temperature',
                    data: weatherData[activeCity].hourly.map(el => el.temp)
                }]"
            />
        </div>

        <div>
            <p class="mt-16 overline">Temperature in current week</p>
            <apexchart
                type="line" 
                :options="{
                    ...options,
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return `${value.toFixed(1)} °C`;
                            }
                        },
                    },
                }" 
                :series="[{
                    name: 'Day',
                    data: weatherData[activeCity].daily.map(el => el.temp.day.toFixed(2))
                }, {
                    name: 'Night',
                    data: weatherData[activeCity].daily.map(el => el.temp.night.toFixed(2))
                }]"
            />
        </div>

        <div>
            <p class="mt-16 overline">Humidity in current week</p>
            <apexchart
                type="area" 
                :options="{
                    ...options,
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return `${value.toFixed(1)} %`;
                            }
                        },
                    },
                }" 
                :series="[{
                    name: 'Day',
                    data: weatherData[activeCity].daily.map(el => el.humidity)
                }]"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import store from '../../store/index';

@Component
export default class WeatherCharts extends Vue {
    next60minutes = [];
    next48h = [];

    get activeCity() { return store.getters.activeCity }
    get activeDay() { return store.getters.activeDay }
    get weatherData() {
        if(store.getters.weatherData.length > 0) {
            this.next60minutes = [];
            const data = store.getters.weatherData;
            let initialDate = new Date(data[this.activeCity].minutely[0].dt * 1000);
            let hours = initialDate.getHours();
            let minutes = initialDate.getMinutes();

            for(let i=0; i<48; i++) {
                if(hours > 23) {
                    hours = 0;
                    minutes = 0;
                }

                this.next48h.push(`${hours >= 10 ? hours : '0'+hours}:00`);

                hours += 1;
            }

            hours = initialDate.getHours();
            minutes = initialDate.getMinutes();
            for(let i=0; i<60; i++) {
                if(minutes > 59) {
                    hours += 1;
                    minutes = 0;
                }

                if(hours > 23) {
                    hours = 0;
                    minutes = 0;
                }
                
                this.next60minutes.push(`${hours >= 10 ? hours : '0'+hours}:${minutes >= 10 ? minutes : '0'+minutes}`);

                minutes += 1;
            }
            return store.getters.weatherData;
        }

        return [];
    }

    options =  {
        chart: {
            id: 'vuechart-example',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        }
    };
}
</script>

<style lang="scss">
.apexcharts-menu, .apexcharts-tooltip, .apexcharts-theme-light {
    color: black;
}
.apexcharts-yaxis {
    color: white !important;
}
</style>