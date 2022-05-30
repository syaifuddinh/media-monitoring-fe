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
                <Button
                    label="Tambah"
                    variant="primary"
                    :width="150"
                    @click="add"
                />
            </div>
            <div class="d-flex mb-16px">
                <div class="flex-grow-1 d-none d-md-block"></div>
                <Paging
                    :key="totalData"
                    :length="paging.length"
                    :total-data="totalData"
                    @change="onPagingChange"
                />
            </div>
            <AnalysisCard
                v-for="value in list"
                :key="value.id"
                :description="value.description"
                :date="value.readablePublishedDate"
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
import Analysis from "@endpoints/Analysis";
import moment from "moment";

export default {
    name: 'IndexPage',
    components: {
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
                const { list, total } = await Analysis.list({ keyword, startDate, endDate, paging });
                this.list = list;
                this.totalData = total;
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
