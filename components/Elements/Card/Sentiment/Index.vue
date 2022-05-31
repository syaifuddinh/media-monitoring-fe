<template>
    <PrimaryCard
        :class="classState"
        :padding-y="24"
        :padding-x="24"
        @click="onClick"
    >
        <LeadParagraphText
            v-if="variant === 'positif'"
            key="positif"
            :weight="700"
            color="success"
            display="block"
            align="center"
            class-name="text-center"
        >
            POSITIF
        </LeadParagraphText>
        <LeadParagraphText
            v-if="variant === 'negatif'"
            key="negatif"
            :weight="700"
            color="danger"
            display="block"
            align="center"
            class-name="text-center"
        >
            NEGATIF
        </LeadParagraphText>
        <LeadParagraphText
            v-if="variant === 'netral'"
            key="netral"
            :weight="700"
            color="warning"
            display="block"
            align="center"
            class-name="text-center"
        >
            NETRAL
        </LeadParagraphText>
        <SemiLeadContentText
            :weight="700"
            display="block"
            class-name="mt-4px text-center"
        >
            {{ amount }}%
        </SemiLeadContentText>
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import LeadParagraphText from "@elements/Text/LeadParagraph/Index";

    export default {
        name: 'IndexPage',
        components: {
            PrimaryCard,
            LeadParagraphText,
            SemiLeadContentText
        },
        props: {
            variant: {
                type: String,
                default: "positif"
            },            
            amount: {
                type: Number,
                default: 0
            },
            
        },
        data() {
            return {
                classState: "cursor-pointer "
            }
        },
        mounted() {
        },
        methods: {
            onClick() {
                this.$emit("click");
            },
            onEdit() {
                this.$emit("edit");
            },
            onDestroy() {
                this.$emit("destroy");
            }   
        }
    }
</script>