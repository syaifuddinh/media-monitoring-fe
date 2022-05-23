<template>
    <div>
        <table class="w-100">
            <slot></slot>
        </table>
        <SmallText
            v-if="isEmpty === true"
            display="block"
            align="center"
            class-name="bb-1 br-1 bl-1 border-light-dark"
            :padding-y="16"
        >
            Tidak ada data
        </SmallText>
    </div>
</template>

<script>
    import SmallText from "@elements/Text/Small/Index";

    export default {
        name: 'IndexPage',
        components: {
            SmallText
        },
        props: {
            isEmpty: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>