<template>
    <div class="mr-16">
        <div>
            <p class="mt-16 overline">Temperature in current week</p>
            <apexchart
                type="line" 
                :options="{
                    ...options,
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return `${value.toFixed(2)} °C`;
                            }
                        },
                    },
                }" 
                :series="[{
                    name: 'Dzień',
                    data: weatherData[activeCity].daily.map(el => el.temp.day.toFixed(2))
                }, {
                    name: 'Noc',
                    data: weatherData[activeCity].daily.map(el => el.temp.night.toFixed(2))
                }]"
            />
        </div>

        <div>
            <p class="mt-16 overline">Humidity in current week</p>
            <apexchart
                type="line" 
                :options="{
                    ...options,
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return `${value.toFixed(2)} %`;
                            }
                        },
                    },
                }" 
                :series="[{
                    name: 'Dzień',
                    data: weatherData[activeCity].daily.map(el => el.humidity)
                }]"
            />
        </div>

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
                        categories: categories
                    }
                }" 
                :series="[{
                    name: 'Opady (mm)',
                    data: weatherData[activeCity].minutely.map(el => el.precipitation.toFixed(2)).splice(0,60)
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
    categories = [];

    get activeCity() { return store.getters.activeCity }
    get activeDay() { return store.getters.activeDay }
    get weatherData() {
        if(store.getters.weatherData.length > 0) {
            this.categories = [];
            const data = store.getters.weatherData;
            let initialDate = new Date(data[this.activeCity].minutely[0].dt * 1000);
            let hours = initialDate.getHours();
            let minutes = initialDate.getMinutes();

            for(let i=0; i<60; i++) {
                if(minutes > 59) {
                    hours += 1;
                    minutes = 0;
                }
                
                this.categories.push(`${hours}:${minutes >= 10 ? minutes : '0'+minutes}`);

                minutes += 1;
            }
        }

        console.log(store.getters.weatherData);
        return store.getters.weatherData;
    }

    options =  {
        chart: {
            id: 'vuechart-example',
        },
        dataLabels: {
            enabled: false,
        },
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