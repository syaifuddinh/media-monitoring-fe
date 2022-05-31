<template>
    <div>
        <PrimaryCard>
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <TextInput
                        label="Tanggal awal"
                        type="date"
                        class-name="mr-16px"
                        v-model="startDate"
                        @change="setData"
                    />
                </div>
                <div class="col-md-6 col-xs-12">
                    <TextInput
                        label="Tanggal akhir"
                        type="date"
                        :margin-auto="true"
                        v-model="endDate"
                        @change="setData"
                    />
                </div>
            </div>
            <TextInput
                v-if="false"
                label="Keyword"
                type="text"
                v-model="keyword"
                @change="onKeywordChange"
            />
        </PrimaryCard>
        <div class="row mt-24px">
            <div class="col-md-4 col-xs-12">
                <SentimentCard
                    variant="positif"
                    :amount="summary.positif"
                    @click="redirectToNews('positif')"
                />
            </div>
            <div class="col-md-4 col-xs-12">
                <SentimentCard
                    variant="negatif"
                    :amount="summary.negatif"
                    @click="redirectToNews('negatif')"
                />
            </div>
            <div class="col-md-4 col-xs-12">
                <SentimentCard
                    variant="netral"
                    :amount="summary.netral"
                    @click="redirectToNews('netral')"
                />
            </div>
        </div>
        <PrimaryCard
            :margin-top="24"
        >
            <NewsChart
                :key="chartCounter"
                :interval="chart.interval"
                :positif="chart.positif"
                :negatif="chart.negatif"
                :netral="chart.netral"
                :total="chart.total"
            />
            <div class="mt-24px">
                <AnalysisCard
                    v-for="value in analysis"
                    :key="value.id"
                    :date="value.readableDate"
                    :description="value.description"
                    :is-show-control="false"
                />
            </div>
        </PrimaryCard>
    </div>
</template>

<script>

import PrimaryCard from "@elements/Card/Primary/Index";
import TextInput from "@elements/Input/Text/Index";
import NewsChart from "@elements/NewsChart/Index";
import SentimentCard from "@elements/Card/Sentiment/Index";
import AnalysisCard from "@elements/Card/Analysis/Index";
import News from "@endpoints/News";
import Analysis from "@endpoints/Analysis";

export default {
    name: 'IndexPage',
    components: {
        TextInput,
        SentimentCard,
        NewsChart,
        PrimaryCard,
        AnalysisCard
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            list: [],
            analysis: [],
            totalData: 0,
            paging: {
                length: 6,
                page: 1
            },
            chart: {
                interval: [],
                positif: [],
                negatif: [],
                netral: [],
                total: []
            },
            summary: {
                positif: 0,
                negatif: 0,
                netral: 0
            },
            chartCounter: 0,
            keywordTimeout: null,
            keyword: "",
            startDate: this.$store.state.News.startDate,
            endDate: this.$store.state.News.endDate
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "Dashboard");
        this.setData();
    },
    methods: {
        async setChart() {
            try {
                const { keyword, startDate, endDate } = this;
                const chart = await News.chart({ keyword, startDate, endDate });
                chart.interval = chart.readableInterval;
                this.chart = chart;
                ++this.chartCounter;
            } catch  {

            }
        },
        async setAnalysis() {
            try {
                const { startDate, endDate } = this;
                const { list } = await Analysis.list({ startDate, endDate });
                this.analysis = list;
            } catch(e)  {
                throw new Error(e);
            }
        },
        async setSentimentSummary() {
            try {
                const { keyword, startDate, endDate } = this;
                const data = await News.sentimentSummary({ keyword, startDate, endDate });
                this.summary = data;
            } catch {

            }
        },
        setData() {
            this.$store.commit("News/setStartDate", this.startDate);
            this.$store.commit("News/setEndDate", this.endDate);
            this.setChart();
            this.setSentimentSummary();
            this.setAnalysis();
        },
        onPagingChange(page) {
            this.paging.page = page;
            this.setList();
        },
        redirectToNews(sentiment) {
            this.$store.commit("News/changeSentiment", sentiment);
            this.$router.push({path: "news"});
        },
        onKeywordChange() {
            if(this.keywordTimeout)
                clearTimeout(this.keywordTimeout);
            this.keywordTimeout = setTimeout(() => {
                this.setData();
            }, 1500);
        }
    }
}
</script>
