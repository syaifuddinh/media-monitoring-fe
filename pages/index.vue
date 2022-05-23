<template>
    <div>
        <PrimaryCard>
            <div class="d-flex">
                <TextInput
                    label="Tanggal awal"
                    type="date"
                    class-name="mr-16px"
                />
                <TextInput
                    label="Tanggal akhir"
                    type="date"
                />
            </div>
        </PrimaryCard>
        <PrimaryCard
            :margin-top="16"
        >
            <NewsChart />
        </PrimaryCard>
        <PrimaryCard
            :margin-top="16"
        >
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </PrimaryCard>
    </div>
</template>

<script>

import PrimaryCard from "@elements/Card/Primary/Index";
import NewsCard from "@elements/Card/News/Index";
import TextInput from "@elements/Input/Text/Index";
import NewsChart from "@elements/NewsChart/Index";

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
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "Dashboard");
    },
    methods: {
    }
}
</script>
