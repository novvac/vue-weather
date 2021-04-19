<template>
    <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        class="mt-5"
        :loading="items.length === 0"
        calculate-width
    >
        <template v-slot:item.day="{ item }">
            {{dtToHumanfriendly(items.indexOf(item), item.dt)}}
        </template>

        <template v-slot:item.humidity="{ item }">
            <v-icon 
                color="blue darken-4" 
                :style="{opacity: item.humidity / 100}"
            >mdi-water</v-icon>
            {{item.humidity}}%
        </template>

        <template v-slot:item.weather_icon="{ item }">
            <v-img :title="item.weather[0].description" :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`" width="48" class="mx-auto"/>
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
        {text: "Day", align: "center", value: "day"},
        {text: "Humidity", align: "center", value: "humidity"},
        {text: "Weather", sortable: false, align: "center", value: "weather_icon"},
        {text: "Day (C°)", align: "center", value: "temp.day"},
        {text: "Night (C°)", align: "center", value: "temp.night"},
    ]
}
</script>