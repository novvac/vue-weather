<template>
    <v-card
        :width="width"
        :height="height"
        class="city-card text-center"
        flat
        color="transparent"
    >
        <div class="image" :style="'background: url(' + city.src + ')'"/>
        
        <p class="mt-3" :style="{paddingTop: height + 'px'}">
            {{city.city}}, {{city.country}}
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

.city-card {
    position: relative;
    cursor: pointer;

    &:hover {
        div.image {
            height: calc(100% + 16px);
            transform: translate(0,-24px);
            box-shadow: 0 4px 6px rgba(0,0,0,.1);
        }
    }
    div.image {
        position: absolute;
        transition: 300ms !important;
        border-radius: 24px !important;
        height: 100%;
        width: 100%;
        background-size: cover !important;
    }
    p {
        font-weight: 500;
    }
}
</style>