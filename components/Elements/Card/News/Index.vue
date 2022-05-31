<template>
    <PrimaryCard
        :class="classState"
        :padding-y="8"
    >
        <div class="row">
            <div class="col-md-8 col-xs-12">
                <SemiLeadContentText
                    display="block"
                    :weight="700"
                >
                    {{ title }}
                </SemiLeadContentText>
            </div>
            <div class="w-100 h-16px d-block d-md-none"></div>
            <div class="col-md-4 col-xs-12 d-flex">
                <div class="flex-grow-1 d-md-block d-none"></div>
                <NormalText
                    v-if="variant === 'positif'"
                    key="positif"
                    :weight="700"
                    color="primary"
                >
                    POSITIF
                </NormalText>
                <NormalText
                    v-if="variant === 'negatif'"
                    key="negatif"
                    :weight="700"
                    color="danger"
                >
                    NEGATIF
                </NormalText>
                <NormalText
                    v-if="variant === 'netral'"
                    key="netral"
                    :weight="700"
                    color="dark-grey"
                >
                    NETRAL
                </NormalText>
            </div>
        </div>
        <SmallText
            display="block"
            :weight="600"
            :margin-top="8"
            class-name="darken-text-primary"
            color=""
        >
            {{ date }}            
        </SmallText>
        <NormalText
            display="block"
            :weight="500"
            :margin-top="8"
        >
            {{ description }}
        </NormalText>
        <SmallText
            display="block"
            :weight="400"
            :margin-top="8"
            color="dark-grey"
        >
            Dilansir oleh : {{ source }}
        </SmallText>
        <LineRuler class-name="mt-16px" />
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import SmallText from "@elements/Text/Small/Index";
    import LineRuler from "@elements/LineRuler/Index";

    export default {
        name: 'IndexPage',
        components: {
            SemiLeadContentText,
            NormalText,
            LineRuler,
            SmallText,
            PrimaryCard
        },
        props: {
            title: {
                type: String,
                default: ""
            },
            description: {
                type: String,
                default: ""
            },
            source: {
                type: String,
                default: ""
            },
            date: {
                type: String,
                default: ""
            },
            variant: {
                type: String,
                default: "positif"
            }
        },
        data() {
            return {
                classState: ""
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>