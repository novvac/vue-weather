<template>
    <v-navigation-drawer
        app
        right
        width="36%"
        class="pa-10 drawer secondary white--text"
        floating
    >
        <v-row class="ma-6" align="center" justify="space-between">
            <div>
                <base-button
                    v-for="(btn, i) in buttons"
                    :key="i"
                    text
                    class="white--text body-1 text-none mr-3 drawer-option"
                    @click="btn.clickEvent ? btn.clickEvent() : undefined"
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
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import store from '../../store/index';

@Component
export default class Drawer extends Vue {
    buttons = [
        {
            text: "Notifications",
            chip: 1,
        },
        {
            text: "Logout",
            clickEvent: function() {store.dispatch("LOGOUT")}
        }
    ]
}
</script>

<style lang="scss">
.drawer {
    .drawer-option {
        &:last-child {
            margin-right: 0 !important;
        }
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