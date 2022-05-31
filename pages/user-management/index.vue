<template>
    <div>
        <PrimaryCard>
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
            <NoData v-if="list.length === 0" />
            <UserCard
                v-for="value in list"
                :key="value.id"
                :title="value.name"
                :username="value.username"
                :user-role="value.userRole"
                @click="onListClicked(value.id)"
                @edit="onEdit(value.id)"
                @destroy="onDestroy(value.id)"
            />
        </PrimaryCard>
    </div>
</template>

<script>

import PrimaryCard from "@elements/Card/Primary/Index";
import UserCard from "@elements/Card/User/Index";
import TextInput from "@elements/Input/Text/Index";
import Paging from "@elements/Paging/Index";
import Button from "@elements/Button/Index";
import NoData from "@elements/NoData/Index";
import User from "@endpoints/User";
import moment from "moment";

export default {
    name: 'IndexPage',
    components: {
        NoData,
        Button,
        Paging,
        UserCard,
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
            const { keyword } = this;
            const paging = this.paging;
            const { list, count } = await User.list({ keyword, paging });
            this.list = list;
            this.totalData = count;
        },
        setData() {
            this.setList();
        },
        add() {
            this.$router.push({path: "/user-management/create"});
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
            this.$router.push({path: "/user-management/show/" + id});
        },
        onEdit(id) {
            this.$router.push({path: "/user-management/edit/" + id});
        },
        async onDestroy(id) {
            try {
                await User.destroy(id);
                this.setList();
            } catch {

            }
        }
    }
}
</script>
