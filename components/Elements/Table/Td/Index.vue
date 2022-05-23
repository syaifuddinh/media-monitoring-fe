<template>
    <td
        :colspan="colspan"
        :class="'py-18px px-8px ' + ('bg-' + background)"
    >
        <div :class="'d-flex align-items-center ' + ('justify-content-' + justifyContent)">
            <div
                v-if="isShowCircleIndicator === true"
                class="mr-8px"
            >
                <CircleFrame
                    :width="8"
                    :height="8"
                    background="warning"
                />
            </div>
            <SmallText
                :weight="weight"
                :color="color"
                :dark-theme-color="darkThemeColor"
            >
                <slot></slot>
            </SmallText>
        </div>
    </td>
</template>

<script>
    import SmallText from "@elements/Text/Small/Index";
    import CircleFrame from "@elements/CircleFrame/Index";

    export default {
        name: 'IndexPage',
        components: {
            CircleFrame,
            SmallText
        },
        props: {
            isShowCircleIndicator: {
                type: Boolean,
                default: false
            },
            colspan: {
                type: Number,
                default: 1
            },
            weight: {
                type: Number,
                default: 400
            },
            justifyContent: {
                type: String,
                default: "start",
            },
            background: {
                type: String,
                default: "transparent",
            },
            color: {
                type: String,
                default: "black",
            },
            darkThemeColor: {
                type: String,
                default: "white",
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