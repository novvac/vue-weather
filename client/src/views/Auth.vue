<template>
    <div class="auth">
        <v-row class="ma-0">
            <v-col cols="5" class="red lighten-1 d-none d-md-block pa-0">
                <vue-particles
                    style="height: 100%; max-height: 100vh; padding: 0; margin: 0;"
                    color="#dedede"
                    :particleOpacity=".75"
                    :particlesNumber="512"
                    shapeType="circle"
                    :particleSize="4"
                    linesColor="#e9e9e9"
                    :linesWidth="1"
                    :lineLinked="true"
                    :lineOpacity="0.4"
                    :linesDistance="30"
                    :moveSpeed="1"
                    :hoverEffect="true"
                    hoverMode="grab"
                    :clickEffect="false"
                >
                </vue-particles>
            </v-col>

            <v-col cols="12" :md="7">
                second column
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class Auth extends Vue {}
</script>

<style lang="scss">
.auth {
    height: 100%;

    .row {
        height: 100%;
    }
}
</style>