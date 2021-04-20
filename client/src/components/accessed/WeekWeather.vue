<template>
    <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        hide-default-header
        class="mt-5 week-table"
        :loading="items.length === 0" 
        @click:row="rowClick()"
    >
        <template v-slot:item="{ item }">
            <tr @click="selectedDay = items.indexOf(item), rowClick(item)">
                <td>
                    <span :style="{fontWeight: items.indexOf(item) === selectedDay ? '900' : '400'}">
                        {{dtToHumanfriendly(items.indexOf(item), item.dt)}}
                    </span>
                </td>
                <td>
                    <v-icon 
                        color="blue darken-4" 
                        :style="{opacity: item.humidity / 100}"
                    >mdi-water</v-icon>
                    {{item.humidity}}%
                </td>
                <td>
                    <v-img class="d-inline-block" :title="item.weather[0].description" :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`" width="56"/>
                </td>
                <td>
                    <div class="d-flex justify-space-between align-center mb-1" style="width: 100%">
                        <span class="d-block" style="font-weight: 500"><v-icon small>mdi-weather-sunny</v-icon> {{item.temp.day.toFixed(1)}}°</span>
                        <span class="d-block" style="font-weight: 500"><v-icon small>mdi-weather-night</v-icon> {{item.temp.night.toFixed(1)}}°</span>
                    </div>
                    <div class="d-flex">
                        <v-progress-linear
                            :buffer-value="(100*item.temp.day)/50 * -1"
                            :value="(100*item.temp.day)/50"
                            stream
                            color="red"
                            style="width: 50%"
                            reverse
                        ></v-progress-linear>
                        <v-progress-linear
                            :buffer-value="(100*item.temp.night)/50 * -1"
                            :value="(100*item.temp.night)/50"
                            stream
                            :color="primary"
                            style="width: 50%"
                        />
                    </div>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import store from '../../store/index';

@Component
export default class WeekWeather extends Vue {
    @Prop(Array) readonly items;

    WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    headers = [
        {value: "day"},
        {align: 'left', value: "humidity"},
        {align: 'left', value: "weather_icon"},
        {align: "center", value: "temp"}
    ]
    selectedDay = 0;

    dtToHumanfriendly(index, dt) {
        if(index === 0)
            return "Today";
        else if(index === 1)
            return "Yesterday"
        else
            return this.WEEK_DAYS[new Date(dt * 1000).getDay()]
    }

    rowClick(value) {
        console.log(this.selectedDay);
        store.dispatch("SET_ACTIVE_DAY", this.selectedDay);
    }
}
</script>

<style lang="scss">
.theme--light.week-table {
    background: transparent !important;
}
tr {
    cursor: pointer;
    transition: 200ms;

    &:hover {
        background: rgba(0,0,0,.1) !important;
    }
}
</style>