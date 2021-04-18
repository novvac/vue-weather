<template>
    <v-card
        v-on="$listeners"
        v-bind="$attrs"
        :style="[{
            ...customStyle,
            'borderRadius': `${rounded}px`
        }]"
    >
        <slot/>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BaseCard extends Vue {
    @Prop({default: 16}) readonly rounded: number
    @Prop({default: {}}) readonly customStyle: object
}
</script>