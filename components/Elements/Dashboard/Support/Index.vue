<template>
    <PrimaryCard :class="classState">
        <Anchor
            :to="url"
            target="_blank"
            decoration="none"
            class-name="d-flex align-items-center"
        >
            <SquareFrame
                :radius="8"
                :padding="4"
                :width="-1"
                :background="this.$store.state.Base.isUseDarkTheme === true ? 'dark' : ''"
            >
                <ImageDisplay
                    :src="image"
                    height="32"
                    width="auto"
                />
            </SquareFrame>
            <SemiLeadContentText
                :weight="700"
                :margin-left="24"
                transform="capitalize"
                display="block"
            >
                {{ label }}
            </SemiLeadContentText>
        </Anchor>
    </PrimaryCard>
</template>

<script>
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import PrimaryCard from "@elements/Card/Primary/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import SquareFrame from "@elements/SquareFrame/Index";
    import Anchor from "@elements/Anchor/Index";

    export default {
        name: 'IndexPage',
        components: {
            Anchor,
            SemiLeadContentText,
            ImageDisplay,
            SquareFrame,
            PrimaryCard
        },
        props: {
            image: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                classState: "",
                imageSource: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setClassState() {
                let classState = " ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
        }
    }
</script>