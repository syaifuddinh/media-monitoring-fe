<template>
    <ExtraSmallText
        :background="background"
        :weight="500"
        :padding-x="4"
        :padding-y="2"
        :radius="16"
        transform="capitalize"
        display="inline-block"
        color="white"
    >
        {{ title }}
    </ExtraSmallText>
</template>

<script>
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";

    export default {
        name: 'IndexPage',
        components: {
            ExtraSmallText
        },
        props: {
            background: {
                type: String,
                default: "dark"
            },
            title: {
                type: String,
                default: ""
            }
        },
        methods: {
        }
    }
</script>