<template>
    <v-card 
        class="add-city d-flex justify-center align-center flex-column"
        height="256"
        width="196"
        color="transparent"
        flat
        :style="{border: '1.32px solid #777 !important', borderRadius: '32px'}"
        v-on="$listeners"
    >
        <v-icon large class="mb-3">mdi-plus</v-icon>
        <span class="overline">Add city</span>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AddCity extends Vue {}
</script>

<style lang="scss">
.add-city {
    cursor: pointer;

    &:before {
        border-radius: 32px;
    }
}
</style>