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
                Daftar Analisa    
            </SectionText>
        </div>
        <PrimaryCard
            class-name="mt-24px"
        >
            <NormalText
                :weight="600"
                class-name="mb-16px"
            >
                Analisa
            </NormalText>
            <div class="mt-16px">
                <VueEditor
                    v-model="description"
                >
                </VueEditor>
            </div>
            <div class="mt-16px">
                <Button
                    :label="id ? 'Edit' : 'Simpan'"
                    variant="primary"
                    :width="150"
                    :disabled="!description"
                    :is-loading="isLoading"
                    @click="submit"
                />
            </div>
        </PrimaryCard>
    </div>
</template>

<script>

import PrimaryCard from "@elements/Card/Primary/Index";
import NormalText from "@elements/Text/Normal/Index";
import Icon from "@elements/Icon/Index";
import Button from "@elements/Button/Index";
import SectionText from "@elements/Text/Section/Index";
import Analysis from "@endpoints/Analysis";
import { VueEditor } from "vue2-editor";

export default {
    name: 'IndexPage',
    components: {
        VueEditor,
        PrimaryCard,
        SectionText,
        NormalText,
        Button,
        Icon
    },
    props: {
        id: {
            type: String,
            default: ""
        },
        descriptionValue: {
            type: String,
            default: ""
        },
        dateValue: {
            type: String,
            default: ""
        }
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            isLoading: false,
            description: ""
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "");
        this.description = this.descriptionValue;
    },
    methods: {
        backward() {
            this.$router.push({path: "/analysis"});
        },
        async submit() {
            const description = this.description;
            this.isLoading = true;
            try {
                if(this.id) {
                    const date = this.dateValue;
                    await Analysis.update(date, description, this.id);
                } 
                else {
                    const date = this.$store.state.News.endDate;
                    await Analysis.store(date, description);
                }
                this.backward();
            } catch {

            }
            this.isLoading = false;
        }
    }
}
</script>
