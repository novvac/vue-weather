<template>
    <v-card
        :width="width"
        :height="height"
        class="city-card text-center"
        flat
        color="transparent"
    >
        <div class="image" :style="{background: 'url(' + city.src + ')', height: 'calc(100% - 36px)'}"/>
        
        <p class="mt-3 text-center" :style="{bottom: 0, width: '100%'}">
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
    width = 178
}
</script>

<style lang="scss">

.city-card {
    position: relative;
    cursor: pointer;

    &:hover {
        div.image {
            top: -12px;
            box-shadow: 0 4px 6px rgba(0,0,0,.1);
            background-size: 105% !important;
            background-position: center !important;
        }
    }
    div.image {
        position: absolute;
        transition: 300ms !important;
        top: 0;
        border-radius: 24px !important;
        width: 100%;
        background-size: 100% !important;
        background-position: center !important;
    }
    p {
        font-weight: 500;
        position: absolute;
        margin-bottom: 0;
    }
}
</style>