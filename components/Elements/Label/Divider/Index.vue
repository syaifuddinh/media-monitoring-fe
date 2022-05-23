<template>
    <div class="d-flex justify-content-center align-items-center my-16px">
        <LineRuler />
        <ExtraSmallText
            :padding-x="4"
            display="block"
            :class="'w-' + width + 'px'"
            align="center"
        >
            {{ title }}
        </ExtraSmallText>
        <LineRuler />
    </div>
</template>

<script>
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import LineRuler from "@elements/LineRuler/Index";

    export default {
        name: 'IndexPage',
        components: {
            LineRuler,
            ExtraSmallText
        },
        props: {
            width: {
                type: Number,
                default: 350
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