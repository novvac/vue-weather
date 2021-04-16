<template>
    <v-navigation-drawer
        app
        right
        width="36%"
        class="pa-16 drawer"
        floating
    >
        <v-row class="ma-0">
            <base-button
                v-for="(btn, i) in buttons"
                :key="i"
                text
                class="body-1 text-none mr-3"
            >
                {{btn.text}}

                <v-chip 
                    v-if="btn.badge"
                    x-small
                    label
                    class="ml-3 px-2 primary"
                >
                    {{btn.chip}}
                </v-chip>
            </base-button>
        </v-row>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Drawer extends Vue {
    buttons = [
        {
            text: "Notifications",
            chip: 1,
        },
        {
            text: "Places",
        }
    ]
}
</script>