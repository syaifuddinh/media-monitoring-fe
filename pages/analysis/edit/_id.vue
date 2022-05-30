<template>
    <Create
        v-if="id"
        :id="id"
        :description-value="description"
        :date-value="date"
    />
</template>

<script>

import Analysis from "@endpoints/Analysis";
import Create from "../Create/Index"

export default {
    name: 'IndexPage',
    components: {
        Create
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            id: "",
            description: "",
            date: ""
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
                const { date, description } = await Analysis.show(id);
                this.id = id;
                this.date = date;
                this.description = description;
            } catch(e) {
                throw new Error(e);
            }
        }
    }
}
</script>
