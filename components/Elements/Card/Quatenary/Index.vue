<template>
    <PrimaryCard :class="classState">
        <div class="row">
            <div class="col-md-6">
                
                <div class="rounded-8px d-inline-block overflow-hidden">
                    <ImageDisplay
                        type="url"
                        height="64"
                        width="auto"
                        src="data:image/png;base64,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"
                    />
                </div>
            </div>
            <div class="col-md-6">
                <ActionButton />
            </div>

        </div>
        <ExtraSmallText
            :margin-top="24"
            :weight="500"
            display="block"
        >
            Marketing
        </ExtraSmallText>
        <SemiLeadContentText
            display="block"
            :weight="700"
            :margin-top="4"
        >
            Mailchimp
        </SemiLeadContentText>
        <ExtraSmallText
            :margin-top="4"
            :weight="500"
            display="block"
        >
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
        </ExtraSmallText>
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import ActionButton from "./ActionButton/Index";

    export default {
        name: 'IndexPage',
        components: {
            ExtraSmallText,
            SemiLeadContentText,
            PrimaryCard,
            ActionButton,
            ImageDisplay
        },
        props: {
            className: {
                type: String,
                default: ""
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
                classState += "h-250px ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>