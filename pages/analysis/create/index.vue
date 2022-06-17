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
            <TextInput
                label="Tanggal"
                type="date"
                :margin-auto="true"
                v-model="date"
            />
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
                    :label="id ? 'Update' : 'Simpan'"
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
import TextInput from "@elements/Input/Text/Index";
import Analysis from "@endpoints/Analysis";
import { VueEditor } from "vue2-editor";

export default {
    name: 'IndexPage',
    components: {
        VueEditor,
        TextInput,
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
            date: "",
            description: ""
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "");
        this.description = this.descriptionValue;
        this.date = this.dateValue;
    },
    methods: {
        backward() {
            this.$router.push({path: "/analysis"});
        },
        async submit() {
            const description = this.description;
            const date = this.date;
            this.isLoading = true;
            try {
                if(this.id) {
                    await Analysis.update(date, description, this.id);
                } 
                else {
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
