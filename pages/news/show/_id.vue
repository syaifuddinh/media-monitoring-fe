<template>
    <div>
        <div class="d-flex align-items-center">
            <div class="mr-16px cursor-pointer" @click="backward">
                <Icon
                    variant="fontawesome"
                    src="arrow-left"
                    class-name="fs-24px"
                />
            </div>
            <SectionText>
                Daftar Berita    
            </SectionText>
        </div>
        <PrimaryCard
            class-name="mt-24px"
        >
            <div v-if="$store.state.User.userRole === 'admin'" class="row mb-24px">
                <div class="col-md-12 d-flex justify-content-end">
                    <EditSentimentModal
                        :sentiment-value="sentiment"
                        :news-id="id"
                        @confirm="setData"
                    >
                        <Button
                            label="Edit Sentimen"
                            :width="200"
                        />
                    </EditSentimentModal>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-12">
                    <SemiLeadContentText
                        :weight="600"
                        display="block"
                    >
                        {{ title }}
                    </SemiLeadContentText>
                </div>
                <div class="col-md-4 col-xs-12 d-flex">
                    <div class="flex-grow-1 d-none d-md-block"></div>
                    <NormalText
                        v-if="sentiment === 'positif'"
                        key="positif"
                        :weight="700"
                        color="primary"
                    >
                        POSITIF
                    </NormalText>
                    <NormalText
                        v-if="sentiment === 'negatif'"
                        key="negatif"
                        :weight="700"
                        color="danger"
                    >
                        NEGATIF
                    </NormalText>
                    <NormalText
                        v-if="sentiment === 'netral'"
                        key="netral"
                        :weight="700"
                        color="dark-grey"
                    >
                        NETRAL
                    </NormalText>
                </div>
                <div class="col-md-12 col-xs-12 mt-16px">
                    <NormalText
                        :weight="600"
                        display="block"
                        color="primary"
                    >
                        {{ date }}
                    </NormalText>
                </div>
            </div>
            <NormalText
                :weight="500"
                display="block"
                :margin-top="24"
            >
                <div ref="description"></div>
            </NormalText>
            <SmallText
                display="block"
                :weight="400"
                :margin-top="8"
                color="dark-grey"
            >
                Dilansir oleh : {{ source }}
            </SmallText>
            <div class="d-flex">
                <SmallText
                    display="block"
                    :weight="400"
                    :margin-top="8"
                    color="dark-grey"
                >
                    Berita bisa dikunjungi pada : <a :href="url" target="_blank">{{ url }}</a>
                </SmallText>
            </div>
            <LineRuler class-name="my-24px" />
            <LeadParagraphText
                :weight="700"
                display="block"
                class-name="text-center"
            >
                SENTIMEN
            </LeadParagraphText>
            <div class="row mt-24px">
                <div class="col-md-4 col-xs-12">
                    <SentimentCard
                        variant="positif"
                        :amount="summary.positif"
                    />
                </div>
                <div class="col-md-4 col-xs-12">
                    <SentimentCard
                        variant="negatif"
                        :amount="summary.negatif"
                    />
                </div>
                <div class="col-md-4 col-xs-12">
                    <SentimentCard
                        variant="netral"
                        :amount="summary.netral"
                    />
                </div>
            </div>
        </PrimaryCard>
    </div>
</template>

<script>

import PrimaryCard from "@elements/Card/Primary/Index";
import SentimentCard from "@elements/Card/Sentiment/Index";
import NormalText from "@elements/Text/Normal/Index";
import SmallText from "@elements/Text/Small/Index";
import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
import LeadParagraphText from "@elements/Text/LeadParagraph/Index";
import Icon from "@elements/Icon/Index";
import Button from "@elements/Button/Index";
import LineRuler from "@elements/LineRuler/Index";
import SectionText from "@elements/Text/Section/Index";
import EditSentimentModal from "@elements/Modal/EditSentiment/Index";
import News from "@endpoints/News";

export default {
    name: 'IndexPage',
    components: {
        EditSentimentModal,
        Button,
        SmallText,
        LeadParagraphText,
        LineRuler,
        PrimaryCard,
        SectionText,
        NormalText,
        SentimentCard,
        SemiLeadContentText,
        Icon
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            id: "",
            date: "",
            description: "",
            sentiment: "",
            source: "",
            url: "",
            title: "",
            summary: {
                positif: 0,
                negatif: 0,
                netral: 0
            },
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "");
        this.setData();
    },
    methods: {
        async setData() {
            try {
                const id = this.$route.params.id;
                this.id = id;
                const { title, sentiment, readableDate, description, source, url, sentimenPositif, sentimenNegatif, sentimenNetral } = await News.show(id);
                this.date = readableDate;
                this.title = title;
                this.source = source;
                this.url = url;
                this.sentiment = sentiment;
                this.summary.positif = sentimenPositif;
                this.summary.negatif = sentimenNegatif;
                this.summary.netral = sentimenNetral;
                this.$refs.description.innerHTML = description;
            } catch(e) {
                throw new Error(e);
            }
        },
        backward() {
            this.$router.push({path: "/news"});
        }
    }
}
</script>
