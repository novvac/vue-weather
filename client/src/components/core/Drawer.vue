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
            <div>
                <base-button
                    v-for="(btn, i) in buttons"
                    :key="i"
                    text
                    class="white--text body-1 text-none mr-3 drawer-option"
                >
                    {{btn.text}}

                    <v-chip 
                        v-if="btn.chip"
                        small
                        label
                        class="ml-3 px-2 error caption d-flex justify-center align-center"
                    >
                        {{btn.chip}}
                    </v-chip>
                </base-button>
            </div>

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
        <div class="ma-6 my-16" v-else>
            <v-row class="ma-0" justify="center" align="center">
                <v-img :title="item.current.weather[0].description" :src="`http://openweathermap.org/img/wn/${item.current.weather[0].icon}@4x.png`" width="56"/>
            </v-row>
        </div>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import store from '../../store/index';

@Component
export default class Drawer extends Vue {
    get drawer() { return store.getters.drawer }
    get cities() { return store.getters.cities }
    get activeCity() { return store.getters.activeCity }
    get weatherData() { return store.getters.weatherData }

    get item() {
        return this.weatherData[this.activeCity];
    }

    buttons = [
        {
            text: "Notifications",
            chip: 1,
        },
    ]
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