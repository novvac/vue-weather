<template>
    <v-card
        :width="width"
        :height="height"
        class="city-card text-center"
        flat
        color="transparent"
        v-on="$listeners"
    >
        <div class="image" :style="{background: 'url(' + city.img + ')', height: 'calc(100% - 36px)'}"/>
        
        <p class="mt-3 text-center text-truncate" :style="{bottom: 0, width: '100%'}">
            <span>{{city.city}}</span><span id="comma">,</span> <span>{{city.country}}</span>
        </p>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CityCard extends Vue {
    @Prop(Object) readonly city: object | undefined

    height = 256
    width = 196
}
</script>

<style lang="scss">
$border-radius: 24px;

.city-card {
    position: relative;
    cursor: pointer;

    &:hover, &.active {
        div.image {
            width: calc(100% + 12px);
            transform: translateX(-6px);
            height: 100% !important;
            box-shadow: 0 4px 6px rgba(0,0,0,.1);
            background-size: 105% !important;
            background-position: center !important;
            overflow: hidden;

            &:after {
                opacity: 1;
            }
        }
        p {
            color: white;
            bottom: 50% !important;
            transform: translateY(50%);
            font-weight: bold;

            span {
                display: block;
                
                &#comma {
                    display: none;
                }
                &:first-child {
                    font-size: 1.42rem;
                }
                &:last-child {
                    font-size: .9rem;
                }
            }
        }   
    }
    div.image {
        position: absolute;
        transition: 300ms !important;
        top: 0;
        border-radius: $border-radius !important;
        width: 100%;
        background-size: 100% !important;
        background-position: center !important;

        &:after, &.active {
            transition: 500ms;
            opacity: 0;
            z-index: 99;
            content: "";
            top: 0; bottom:0;
            left: 0; right: 0;
            position: absolute;
            background: rgba(0,0,0,.4);
            border-radius: $border-radius;
        }
    }
    p {
        font-weight: 500;
        position: absolute;
        margin-bottom: 0;
        transition: 200ms cubic-bezier(.32,.02,0,1.18);
    }
}
</style>