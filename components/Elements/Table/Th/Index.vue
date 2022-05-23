<template>
    <th class="py-18px bg-light-dark px-8px">
        <ExtraSmallText
            dark-theme-color="dark-grey"
            color="dark-grey"
            :weight="600"
            :align="align"
            transform="uppercase"
            display="block"
            class-name="br-1 bl-1 border-light-dark"
        >
            <slot></slot>
        </ExtraSmallText>
    </th>
</template>

<script>
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";

    export default {
        name: 'IndexPage',
        components: {
            ExtraSmallText
        },
        props: {
            align: {
                type: String,
                default: "left"
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