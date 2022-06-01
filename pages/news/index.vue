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
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <SentimentInput
                        v-model="sentiment"
                        @change="setData"
                    />
                </div>
                <div class="col-md-6 col-xs-12">
                    <NewsSourceInput
                        v-model="newsSource"
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

            <div class="d-flex mb-16px">
                <div class="flex-grow-1 d-none d-md-block"></div>
                <Paging
                    :key="totalData"
                    :length="paging.length"
                    :total-data="totalData"
                    @change="onPagingChange"
                />
            </div>
            <NoData v-if="list.length === 0" />
            <NewsCard
                v-for="value in list"
                :key="value.id"
                :title="value.title"
                :description="value.description"
                :source="value.source"
                :date="value.readablePublishedDate"
                :variant="value.sentiment"
                @click="onListClicked(value.id)"
            />
        </PrimaryCard>
    </div>
</template>

<script>

import PrimaryCard from "@elements/Card/Primary/Index";
import NewsCard from "@elements/Card/News/Index";
import TextInput from "@elements/Input/Text/Index";
import SentimentInput from "@elements/Input/Sentiment/Index";
import NewsSourceInput from "@elements/Input/NewsSource/Index";
import Paging from "@elements/Paging/Index";
import NoData from "@elements/NoData/Index";
import News from "@endpoints/News";

export default {
    name: 'IndexPage',
    components: {
        Paging,
        NoData,
        NewsCard,
        TextInput,
        SentimentInput,
        NewsSourceInput,
        PrimaryCard,
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            list: [],
            totalData: 0,
            paging: {
                length: 10,
                page: 1
            },
            sentiment: this.$store.state.News.sentiment,
            newsSource: "",
            keywordTimeout: null,
            keyword: "",
            startDate: this.$store.state.News.startDate,
            endDate: this.$store.state.News.endDate
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "Berita");
        this.setData();
    },
    methods: {
        async setList() {
            const { keyword, startDate, endDate, newsSource, sentiment } = this;
            const paging = this.paging;
            const { list, count } = await News.list({ keyword, startDate, endDate, paging, newsSource, sentiment });
            this.list = list;
            this.totalData = count;
        },
        setData() {
            this.setList();
        },
        onPagingChange(page) {
            this.paging.page = page;
            this.setList();
        },
        onKeywordChange() {
            if(this.keywordTimeout)
                clearTimeout(this.keywordTimeout);
            this.keywordTimeout = setTimeout(() => {
                this.setData();
            }, 1500);
        },
        onListClicked(id) {
            this.$router.push({path: "/news/show/" + id});
        }
    }
}
</script>
