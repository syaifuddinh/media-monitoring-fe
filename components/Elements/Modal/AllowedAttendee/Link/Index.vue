<template>
    <SquareFrame
        background="dark"
        :padding="24"
        :radius="8"
        class-name="w-100 cursor-pointer"
        :margin-top="16"
    >
        <div class="row d-flex align-items-center">
            <div class="w-85 pl-24px">
                <NormalText
                    :weight="700"
                    display="block"
                >
                    {{ title }}
                </NormalText>
                <ExtraSmallText
                    :weight="400"
                    display="block"
                    :margin-top="4"
                    color="dark-grey"
                    dark-theme-color="dark-grey"
                >
                    {{ description }}
                </ExtraSmallText>
            </div>

            <div
                v-if="isActive === true"
                class="w-15 d-flex justify-content-center"
            >
                <CircleFrame
                    background="primary"
                    :width="26"
                    :height="26"
                >
                    <Icon
                        variant="fontawesome"
                        src="check"
                        color="black"
                        dark-theme-color="black"
                        size="12"
                    />
                </CircleFrame>
            </div>
        </div>
    </SquareFrame>
</template>

<script>
    import SquareFrame from "@elements/SquareFrame/Index";
    import CircleFrame from "@elements/CircleFrame/Index";
    import Icon from "@elements/Icon/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";

    export default {
        name: 'IndexPage',
        components: {
            CircleFrame,
            Icon,
            NormalText,
            ExtraSmallText,
            SquareFrame
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                required: true
            },
            isActive: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                classState: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setClassState() {
                let classState = "";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
            confirm(closeModal) {
                closeModal();
            }
        }
    }
</script>