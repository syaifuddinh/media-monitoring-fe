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
            <div class="row">
                <div class="col-md-3 col-xs-12"></div>
                <div class="col-md-3 col-xs-12">
                    <Button
                        label="Download Excel"
                        variant="success"
                        :width="200"
                        @click="downloadExcel"
                    />
                </div>
                <div class="col-md-3 col-xs-12">
                    <Button
                        label="Download PDF"
                        variant="cherry"
                        :width="200"
                        @click="downloadPdf"
                    />                    
                </div>
                <div class="col-md-3 col-xs-12">
                    <Button
                        label="Tambah"
                        variant="primary"
                        @click="add"
                    />
                </div>
            </div>

            <div class="d-flex my-16px">
                <div class="flex-grow-1 d-none d-md-block"></div>
                <Paging
                    :key="totalData"
                    :length="paging.length"
                    :total-data="totalData"
                    @change="onPagingChange"
                />
            </div>
            <NoData v-if="list.length === 0" />
            <AnalysisCard
                v-for="value in list"
                :key="value.id"
                :description="value.description"
                :date="value.readableDate"
                :variant="value.sentiment"
                @click="onListClicked(value.id)"
                @edit="onEdit(value.id)"
                @destroy="onDestroy(value.id)"
            />
        </PrimaryCard>
    </div>
</template>

<script>

import PrimaryCard from "@elements/Card/Primary/Index";
import AnalysisCard from "@elements/Card/Analysis/Index";
import TextInput from "@elements/Input/Text/Index";
import Paging from "@elements/Paging/Index";
import Button from "@elements/Button/Index";
import NoData from "@elements/NoData/Index";
import Analysis from "@endpoints/Analysis";
import moment from "moment";

export default {
    name: 'IndexPage',
    components: {
        NoData,
        Button,
        Paging,
        AnalysisCard,
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
        this.$store.commit("Base/setPageTitle", "Analisa");
        this.setData();
    },
    methods: {
        async setList() {
            try {
                const { keyword, startDate, endDate } = this;
                const paging = this.paging;
                const { list, count } = await Analysis.list({ keyword, startDate, endDate, paging });
                this.list = list;
                this.totalData = count;
            } catch {

            }
        },
        async onDestroy(id) {
            try {
                await Analysis.destroy(id);
                this.setList();
            } catch {

            }
        },
        setData() {
            this.setList();
        },
        downloadExcel() {
            const { startDate, endDate } = this;
            Analysis.downloadExcel({ startDate, endDate });
        },
        downloadPdf() {
            const { startDate, endDate } = this;
            Analysis.downloadPdf({ startDate, endDate });
        },
        add() {
            this.$router.push({path: "/analysis/create"});
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
            this.$router.push({path: "/analysis/show/" + id});
        },
        onEdit(id) {
            this.$router.push({path: "/analysis/edit/" + id});
        }
    }
}
</script>
