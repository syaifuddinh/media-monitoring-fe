<template>
    <PrimaryCard
        :class="classState"
        :background="background"
        :dark-theme-background="background ? background : 'light-dark'"
    >
        <ImageDisplay
            :src="image"
            height="48"
            width="auto"
        />
        <SemiLeadContentText
            display="block"
            :weight="700"
            transform="capitalize"
            :margin-top="24"
        >
            {{ title }}
        </SemiLeadContentText>
        <ExtraSmallText
            display="block"
            :margin-top="4"
        >
            {{ description }}
        </ExtraSmallText>
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";

    export default {
        name: 'IndexPage',
        components: {
            SemiLeadContentText,
            ExtraSmallText,
            PrimaryCard,
            ImageDisplay
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
            background: {
                type: String,
                default: ""
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
                classState += "h-185px ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>