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
                Daftar Event    
            </SectionText>
        </div>
        <PrimaryCard
            class-name="mt-24px"
        >
            <div class="row">
                <div class="col-md-7 col-xs-12">
                    <SemiLeadContentText
                        :weight="600"
                        display="block"
                    >
                        Event
                    </SemiLeadContentText>
                </div>
                <div class="col-md-5 col-xs-12 d-flex">
                    <div class="flex-grow-1 d-none d-md-block"></div>
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
        </PrimaryCard>
    </div>
</template>

<script>

import PrimaryCard from "@elements/Card/Primary/Index";
import NormalText from "@elements/Text/Normal/Index";
import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
import Icon from "@elements/Icon/Index";
import SectionText from "@elements/Text/Section/Index";
import Analysis from "@endpoints/Analysis";

export default {
    name: 'IndexPage',
    components: {
        PrimaryCard,
        SectionText,
        NormalText,
        SemiLeadContentText,
        Icon
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            date: "",
            description: ""
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
                const { readableDate, description } = await Analysis.show(id);
                this.date = readableDate;
                this.$refs.description.innerHTML = description;
            } catch(e) {
                throw new Error(e);
            }
        },
        backward() {
            this.$router.push({path: "/analysis"});
        }
    }
}
</script>
