<template>
    <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        hide-default-header
        class="mt-5 week-table"
        :loading="items.length === 0"   
    >
        <template v-slot:item.day="{ item }">
            <span :style="{fontWeight: items.indexOf(item) === 0 ? '900' : '400'}">
                {{dtToHumanfriendly(items.indexOf(item), item.dt)}}
            </span>
        </template>

        <template v-slot:item.humidity="{ item }">
            <v-icon 
                color="blue darken-4" 
                :style="{opacity: item.humidity / 100}"
            >mdi-water</v-icon>
            {{item.humidity}}%
        </template>

        <template v-slot:item.weather_icon="{ item }">
            <v-img class="d-inline-block" :title="item.weather[0].description" :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`" width="56"/>
        </template>

        <template v-slot:item.temp="{ item }">
            <div class="d-flex justify-space-between align-center mb-1" style="width: 100%">
                <span class="d-block" style="font-weight: 500"><v-icon small>mdi-weather-sunny</v-icon> {{item.temp.day.toFixed(1)}}°</span>
                <span class="d-block" style="font-weight: 500"><v-icon small>mdi-weather-night</v-icon> {{item.temp.night.toFixed(1)}}°</span>
            </div>
            <div class="d-flex">
                <v-progress-linear
                    :buffer-value="(100*item.temp.day)/50"
                    :value="(100*item.temp.day)/50"
                    stream
                    color="red"
                    style="width: 50%"
                    reverse
                ></v-progress-linear>
                <v-progress-linear
                    :buffer-value="(100*item.temp.night)/50"
                    :value="(100*item.temp.night)/50"
                    stream
                    :color="primary"
                    style="width: 50%"
                />
            </div>
        </template>
    </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class WeekWeather extends Vue {
    @Prop(Array) readonly items;

    dtToHumanfriendly(index, dt) {
        if(index === 0)
            return "Today";
        else if(index === 1)
            return "Yesterday"
        else
            return this.WEEK_DAYS[new Date(dt * 1000).getDay()]
    }

    WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    headers = [
        {value: "day"},
        {align: 'left', value: "humidity"},
        {align: 'left', value: "weather_icon"},
        {align: "center", value: "temp"}
    ]
}
</script>

<style lang="scss">
.theme--light.week-table {
    background: transparent !important;
}
</style>