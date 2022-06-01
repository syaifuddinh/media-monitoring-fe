<template>
    <div>
        <PrimaryCard>
            <div class="d-flex">
                <TextInput
                    label="Keyword"
                    type="text"
                    v-model="keyword"
                    @change="storeKeyword"
                />
            </div>
        </PrimaryCard>
    </div>
</template>

<script>

import PrimaryCard from "@elements/Card/Primary/Index";
import TextInput from "@elements/Input/Text/Index";
import Setting from "@endpoints/Setting";

export default {
    name: 'IndexPage',
    components: {
        TextInput,
        PrimaryCard,
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            keywordTimeout: null,
            keyword: ""
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "Setting Umum");
        this.showKeyword();
    },
    methods: {
        async showKeyword() {
            const { value } = await Setting.show("keyword");
            this.keyword = value;
        },
        storeKeyword() {
            if(this.keywordTimeout)
                clearTimeout(this.keywordTimeout);
            this.keywordTimeout = setTimeout(async () => {
                try {
                    await Setting.store("keyword", this.keyword);
                    window.$nuxt.$toast.success("Keyword berhasil disimpan");
                } catch {

                }
            }, 1500);
        }
    }
}
</script>
