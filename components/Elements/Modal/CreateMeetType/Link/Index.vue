<template>
    <SquareFrame
        :background="$store.state.Base.isUseDarkTheme ? 'dark' : 'light-grey'"
        :padding="24"
        :radius="8"
        class-name="w-100 cursor-pointer"
        :margin-top="16"
    >
        <div class="d-flex">
            <div class="w-64px mr-24px">
                <ImageDisplay
                    :src="image"
                    height="64"
                    width="64"
                />
            </div>
            <div>
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
                    dark-theme-color="dark-grey"
                >
                    {{ description }}
                </ExtraSmallText>
            </div>
        </div>
    </SquareFrame>
</template>

<script>
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import SquareFrame from "@elements/SquareFrame/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";

    export default {
        name: 'IndexPage',
        components: {
            NormalText,
            ExtraSmallText,
            ImageDisplay,
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
            image: {
                type: String,
                required: true
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