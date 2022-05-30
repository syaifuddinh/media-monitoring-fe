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
                Daftar User    
            </SectionText>
        </div>
        <PrimaryCard
            class-name="mt-24px"
        >
            <SemiLeadContentText
                :weight="600"
                display="block"
            >
                Analisa
            </SemiLeadContentText>
            <NormalText
                :weight="500"
                display="block"
            >
                Analisa
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
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "");
    },
    methods: {
        backward() {
            this.$router.push({path: "/user-management"});
        }
    }
}
</script>
