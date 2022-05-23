<template>
    <PrimaryCard
        :class="classState"
        :padding-x="56"
        :padding-y="56"
    >
        <ContentText
            display="block"
            color="primary"
            :weight="600"
            transform="uppercase"
            align="center"
        >
            {{ title }}
        </ContentText>
        <LeadContentText
            display="block"
            color="white"
            align="center"
            :weight="600"
            :margin-top="12"
        >
            {{ price }}
        </LeadContentText>
        <ContentText
            v-if="unit"
            display="block"
            align="center"
            color="dark-grey"
        >
            {{ unit }}
        </ContentText>
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import LeadContentText from "@elements/Text/LeadContent/Index";
    import ContentText from "@elements/Text/Content/Index";

    export default {
        name: 'IndexPage',
        components: {
            LeadContentText,
            ContentText,
            PrimaryCard
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
            price: {
                type: String,
                required: true
            },
            unit: {
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
                classState += "h-185px ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>