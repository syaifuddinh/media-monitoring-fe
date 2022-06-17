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
            <div class="d-flex justify-content-end mb-24px">
                <Button
                    label="Download PDF"
                    :width="200"
                    :is-loading="isLoading"
                    @click="downloadPDF"
                />
            </div>
            <div ref="newschart">
                <NewsChart
                    :key="chartCounter"
                    :date-interval="chart.dateInterval"
                    :interval="chart.interval"
                    :positif="chart.positif"
                    :negatif="chart.negatif"
                    :netral="chart.netral"
                    :total="chart.total"
                    @load="setChartImage"
                />
            </div>
        </PrimaryCard>
        <div ref="analysis">
            <PrimaryCard
                :margin-top="24"
            >
                <LeadContentText
                    :weight="700"
                    display="block"
                    class-name="pl-24px mb-8px"
                >
                    ANALISA :
                </LeadContentText>
                <AnalysisCard
                    v-for="value in analysis"
                    :key="value.id"
                    :description="value.description"
                    :is-show-control="false"
                />
                <NoData v-if="analysis.length === 0" />
            </PrimaryCard>
        </div>
    </div>
</template>

<script>

import NoData from "@elements/NoData/Index";
import PrimaryCard from "@elements/Card/Primary/Index";
import TextInput from "@elements/Input/Text/Index";
import NewsChart from "@elements/NewsChart/Index";
import SentimentCard from "@elements/Card/Sentiment/Index";
import AnalysisCard from "@elements/Card/Analysis/Index";
import LeadContentText from "@elements/Text/LeadContent/Index";
import Button from "@elements/Button/Index";
import News from "@endpoints/News";
import Analysis from "@endpoints/Analysis";
import JsPDF from 'jspdf' 
import moment from "moment";

export default {
    name: 'IndexPage',
    components: {
        LeadContentText,
        NoData,
        Button,
        TextInput,
        SentimentCard,
        NewsChart,
        PrimaryCard,
        AnalysisCard
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            chartImage: "",
            isLoading: false,
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
        setChartImage(image) {
            this.chartImage = image;
        },
        downloadPDF() {
            this.isLoading = true;
            setTimeout(() => {
                const doc = new JsPDF();
                const startDate = moment(this.startDate).format("DD MMMM YYYY");
                const endDate = moment(this.endDate).format("DD MMMM YYYY");
                // let startText = 112;
                const el = document.createElement("div");
                const pageWidth = "600px";
                el.style.fontSize = "4px";
                el.style.width = pageWidth;
                el.style.padding = "8px";
                const headerEl = document.createElement("div");
                headerEl.style.marginBottom = "4px";
                headerEl.innerHTML = "Tanggal : " + startDate + " s/d " + endDate;
                el.append(headerEl);

                const legendEl = document.createElement("div");
                legendEl.style.width = "600px";
                legendEl.style.height = "20px";
                legendEl.innerHTML += "<div style='display:inline-block;'><div style='background:#00CDB4;width:12px;height:4px;display:inline-block;'></div> <div style='display:inline-block;height:4px;font-size:4px'>Positif</div></div>"
                legendEl.innerHTML += "<div style='display:inline-block;margin-left:8px'><div style='background:#FF5630;width:12px;height:4px;display:inline-block;'></div> <div style='display:inline-block;height:4px;font-size:4px'>Negatif</div></div>"
                legendEl.innerHTML += "<div style='display:inline-block;margin-left:8px'><div style='background:#FFA600;width:12px;height:4px;display:inline-block;'></div> <div style='display:inline-block;height:4px;font-size:4px'>Netral</div></div>"
                legendEl.innerHTML += "<div style='display:inline-block;margin-left:8px'><div style='background:#A0AABF;width:12px;height:4px;display:inline-block;'></div> <div style='display:inline-block;height:4px;font-size:4px'>Total Sentimen</div></div>"
                el.append(legendEl)
                el.innerHTML += "<img src='" + this.chartImage + "' width='190' height='85' />"
                const analysisEl = document.createElement("div");
                const title = "<div style='font-size:10px;font-weight:500'>Analisa</div>";
                analysisEl.style.width = pageWidth;
                analysisEl.style.marginTop = "4px";
                // analysisEl.style.wordWrap = "break-word";
                analysisEl.style.maxWidth = "192px";
                // analysisEl.style.wordBreak = "break-all";
                analysisEl.innerHTML = title;
                this.analysis.forEach(({ description }) => {
                    analysisEl.innerHTML += "<div style='word-break:break-all'>" + description + "</div>";
                });
                analysisEl.querySelectorAll("p").forEach(value => {
                    value.style.fontSize="4px";
                    value.style.margin="0px";
                    value.style.padding="0px";
                    value.style.marginTop="2px";
                    value.style.marginBottom="2px";
                });
                el.append(analysisEl);
                doc.html(el, {
                    callback(e) {
                        this.isLoading = false;
                        e.save("doc.pdf")
                    }
                });
                this.isLoading = false;
            }, 500);
            // this.analysis.forEach(value => {
            //     startText += 8;
            // });
        },
        async setChart() {
            try {
                const { keyword, startDate, endDate } = this;
                const chart = await News.chart({ keyword, startDate, endDate });
                chart.dateInterval = chart.interval;
                chart.interval = chart.readableInterval;
                this.chart = chart;
                ++this.chartCounter;
            } catch  {

            }
        },
        async setAnalysis() {
            try {
                const date = this.endDate
                const { list } = await Analysis.list({ date });
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
