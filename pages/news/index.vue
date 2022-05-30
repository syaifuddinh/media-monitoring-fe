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
            <div class="d-flex mb-16px">
                <div class="flex-grow-1 d-none d-md-block"></div>
                <Paging
                    :key="totalData"
                    :length="paging.length"
                    :total-data="totalData"
                    @change="onPagingChange"
                />
            </div>
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
import Paging from "@elements/Paging/Index";
import News from "@endpoints/News";
import moment from "moment";

export default {
    name: 'IndexPage',
    components: {
        Paging,
        NewsCard,
        TextInput,
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
            const paging = this.paging;
            const { list, total } = await News.list({ keyword, startDate, endDate, paging });
            this.list = list;
            this.totalData = total;
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
        }
    }
}
</script>
