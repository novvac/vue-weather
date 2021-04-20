<template>
    <div class="auth">
        <v-row class="ma-0" :style="{flexDirection: 'row' + (logging ? '-reverse' : '')}">
            <v-col cols="5" :class="[logging ? 'success' : 'red', 'd-none', 'd-md-block', 'pa-0']" style="position: relative;">
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

            <v-col cols="12" :md="7" class="col">
                <v-container class="d-flex justify-center align-center flex-column text-center px-md-16" style="height: 100%">
                    <span :class="[(logging ? 'success' : 'red') + '--text', 'font-weight-bold', 'display-2']">
                        {{logging ? "Logging into app" : "Create free account"}}
                    </span>

                    <base-button
                        small
                        outlined
                        class="mt-5 d-md-none"
                        @click="logging = !logging"
                    >
                        {{logging ? "Sign up" : "Sign in"}}
                    </base-button>

                    <p class="body-1 mt-8 mb-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    <base-input
                        placeholder="Email address"
                        prepend-inner-icon="mdi-email"
                        filled
                        solo-inverted
                        flat
                        class="px-md-16"
                        style="width: 100%"
                        color="white"
                        type="email"
                        v-model="credentials.email"
                        :error="Boolean(errors.email)"
                        :error-messages="errors.email"
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
                        :error="Boolean(errors.password)"
                        :error-messages="errors.password"
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
                        :error="Boolean(errors.repassword)"
                        :error-messages="errors.repassword"
                    />
                    <p class="body-1 mt-2 mb-8 caption" v-if="!logging">By creating an account, you accept the <a href="#terms-and-conditions">terms and conditions</a> of our website.</p>

                    <base-button
                        outlined
                        x-large
                        rounded
                        color="red"
                        :disabled="!credentialsComplete || loading"
                        :loading="loading"
                        @click="submitForm()"
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
import store from '../store/index';

@Component
export default class Auth extends Vue {
    logging = false;
    loading = false;
    errors = {};
    credentials = {
        email: "",
        password: "",
        repassword: "",
    };
    credentialsComplete = false;

    @Watch('credentials', {deep: true})
    @Watch('logging')
    onCredentialsChanged() {
        if(this.credentials.email.length > 0 && this.credentials.password.length > 0) {
            this.credentialsComplete = true;

            if(!this.logging) {
                if(this.credentials.repassword.length === 0)
                    this.credentialsComplete = false;
            }
        } else {
            this.credentialsComplete = false;
        }
    }

    @Watch('logging')
    onLoggingChanged() {
        this.errors = {};
    }

    @Watch('loading')
    onLoadingChanged(val: boolean) {
        // loading started (delete errors)
        if(val) {
            this.errors = {};
        }
    }

    submitForm() {
        this.loading = true;
        const url = this.logging ? "/api/auth/login" : "/api/auth/register";
        
        this.$http.post(url, this.credentials)
            .then((res : any) => {
                this.loading = false;
                this.errors = {};
                this.credentials = {email: "", password: "", repassword: ""};
                
                if(this.logging) {
                    store.dispatch("SET_USER", res.data);
                    this.$router.push("/");
                } else {
                    this.$toast.success("Account was created!");
                }
            })
            .catch((err : any) => {
                this.errors = err.response.data;
                this.loading = false;
            })
    }
}
</script>

<style lang="scss">
.auth {
    height: 100%;
    position: relative;

    * {
        transition: 750ms cubic-bezier( 0.03, 0.06, 0.08, 0.95 );
    }
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