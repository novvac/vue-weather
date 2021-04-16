<template>
    <div class="auth">
        <v-row class="ma-0" :style="{flexDirection: 'row' + (logging ? '-reverse' : '')}">
            <v-col cols="5" class="red d-none d-md-block pa-0" style="position: relative;">
                <vue-particles
                    class="particles"
                    color="#dedede"
                    :particleOpacity=".75"
                    :particlesNumber="400"
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
                />

                <div class="d-flex justify-center align-center flex-column text-center white--text" style="height: 100%">
                    <span class="display-2 font-weight-bold">
                        {{logging ? "Welcome back!" : "Master the weather!"}}
                    </span>

                    <p class="mb-10 mt-8 mx-10 body-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, est labore unde ipsa laborum quia officiis nobis debitis porro dolore omnis architecto quam? Magni magnam saepe beatae nulla animi enim.</p>
                
                    <base-button
                        x-large
                        outlined
                        color="white"
                        rounded
                        @click="logging = !logging"
                    >
                        {{logging ? "Sign up" : "Sign in"}}
                    </base-button>
                </div>
            </v-col>

            <v-col cols="12" :md="7">
                <v-container class="d-flex justify-center align-center flex-column text-center px-md-16" style="height: 100%">
                    <span class="red--text font-weight-bold display-2">
                        {{logging ? "Logging into app" : "Create free account"}}
                    </span>

                    <p class="body-1 mt-8 mb-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    <base-input
                        placeholder="Email address"
                        prepend-inner-icon="mdi-email"
                        filled
                        solo-inverted
                        flat
                        class="px-md-16"
                        style="width: 100%"
                        hint="Adres email"
                        color="white"
                        type="email"
                        v-model="credentials.email"
                    />
                    <base-input
                        placeholder="Password"
                        prepend-inner-icon="mdi-lock"
                        filled
                        solo-inverted
                        flat
                        class="px-md-16"
                        style="width: 100%"
                        color="white"
                        type="password"
                        v-model="credentials.password"
                    />
                    <base-input
                        placeholder="Repeat password"
                        prepend-inner-icon="mdi-lock"
                        filled
                        solo-inverted
                        flat
                        class="px-md-16"
                        style="width: 100%"
                        color="white"
                        type="password"
                        v-if="!logging"
                        v-model="credentials.repassword"
                    />
                    <p class="body-1 mt-2 mb-8 caption" v-if="!logging">By creating an account, you accept the <a href="#terms-and-conditions">terms and conditions</a> of our website.</p>

                    <base-button
                        outlined
                        x-large
                        rounded
                        color="red"
                        :disabled="!credentialsComplete"
                    >
                        {{logging ? "Sign in" : "Sign up"}}
                    </base-button>
                </v-container>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class Auth extends Vue {
    logging = false;
    credentials = {};
    credentialsComplete = false;

    @Watch('credentials', {deep: true})
    @Watch('logging')
    onCredentialsChanged() {
        let flag = true;
        const keys = Object.keys(this.credentials);

        (keys.includes("email") && this.credentials.email.length > 0) ? null : flag = false;
        (keys.includes("password") && this.credentials.password.length > 0) ? null : flag = false;
        if(!this.logging)
            (keys.includes("repassword") && this.credentials.repassword.length > 0) ? null : flag = false;

        if(flag) {
            this.credentialsComplete = true;
        } else {
            this.credentialsComplete = false;
        }
    }
}
</script>

<style lang="scss">
.auth {
    height: 100%;

    .row {
        height: 100%;

        .particles {
            height: 100%;
            width: 100%;
            max-height: 100vh; 
            padding: 0; 
            margin: 0;
            position: absolute;
        }
    }
}
</style>