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
                label="Keyword"
                type="text"
                v-model="keyword"
                @change="onKeywordChange"
            />
        </PrimaryCard>
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
        </PrimaryCard>
        <PrimaryCard
            :margin-top="24"
        >
            <NewsCard
                v-for="value in list"
                :key="value.id"
                :title="value.title"
                :description="value.description"
                :source="value.source"
                :date="value.readablePublishedDate"
                :variant="value.sentiment"
            />
        </PrimaryCard>
    </div>
</template>

<script>

import PrimaryCard from "@elements/Card/Primary/Index";
import NewsCard from "@elements/Card/News/Index";
import TextInput from "@elements/Input/Text/Index";
import NewsChart from "@elements/NewsChart/Index";
import News from "@endpoints/News";
import moment from "moment";

export default {
    name: 'IndexPage',
    components: {
        NewsCard,
        TextInput,
        NewsChart,
        PrimaryCard,
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            list: [],
            chart: {
                interval: [],
                positif: [],
                negatif: [],
                netral: [],
                total: []
            },
            chartCounter: 0,
            keywordTimeout: null,
            keyword: "",
            startDate: moment().subtract(7, "d").format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD")
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "Dashboard");
        this.setData();
    },
    methods: {
        async setList() {
            const { keyword, startDate, endDate } = this;
            const { list } = await News.list({ keyword, startDate, endDate });
            this.list = list;
        },
        async setChart() {
            const { keyword, startDate, endDate } = this;
            const chart = await News.chart({ keyword, startDate, endDate });
            chart.interval = chart.readableInterval;
            this.chart = chart;
            ++this.chartCounter;
        },
        setData() {
            this.setList();
            this.setChart();
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
