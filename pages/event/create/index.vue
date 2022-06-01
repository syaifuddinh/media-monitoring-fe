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
            <div class="mt-16px">
                <TextInput
                    label="Tanggal"
                    type="date"
                    :margin-auto="true"
                    v-model="date"
                />
                <TextInput
                    label="Event"
                    :margin-auto="true"
                    v-model="description"
                />
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
import Icon from "@elements/Icon/Index";
import Button from "@elements/Button/Index";
import SectionText from "@elements/Text/Section/Index";
import TextInput from "@elements/Input/Text/Index";
import Event from "@endpoints/Event";

export default {
    name: 'IndexPage',
    components: {
        TextInput,
        PrimaryCard,
        SectionText,
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
            this.$router.push({path: "/event"});
        },
        async submit() {
            const description = this.description;
            const date = this.date;
            this.isLoading = true;
            try {
                if(this.id) {
                    await Event.update(date, description, this.id);
                } 
                else {
                    await Event.store(date, description);
                }
                this.backward();
            } catch {

            }
            this.isLoading = false;
        }
    }
}
</script>
