<template>
    <div class="d-flex align-items-center">
        <SelectInput
            label="Durasi"
            primary-label="menit"
            :options="items"
            :margin-auto="true"
            class="w-50"
            @change="onChange"
            v-model="data"
        />
        <div class="pt-8px w-40">
            <CreateAvailibilityModal
                v-if="data"
                :interval="data * 60"
                :key="data"
                @confirm="onConfirm"
                @close="onClose"
            >
                <Button
                    label="Atur Ketersediaan"
                    variant="outline-primary"
                    :margin-left="16"
                />
            </CreateAvailibilityModal>
        </div>
    </div>
</template>

<script>
    import SelectInput from '@elements/Input/Select/Index';
    import Button from '@elements/Button/Index';
    import CreateAvailibilityModal from '@elements/Modal/CreateAvailibility/Index';

    export default {
        name: 'IndexPage',
        components: {
            Button,
            CreateAvailibilityModal,
            SelectInput
        },
        props: {
            value: {
                type: Number,
                default: null
            }
        },
        computed: {
            data: {
                get() {
                    return this.value;
                }
            }
        },
        data() {
            return {
                classState: "",
                items: []
            }
        },
        mounted() {
            this.setItems();
        },
        methods: {
            setItems() {
                const items = [];
                items.push({id:15, text: '15 Menit'});
                items.push({id:30, text: '30 Menit'});
                items.push({id:45, text: '45 Menit'});
                items.push({id:60, text: '60 Menit'});
                this.items = items;
            },
            onChange(e) {
                this.data = e.id;
                this.$emit("input", e.id);
                this.$emit("change", e);
            },
            onClose() {
                this.$emit("availibility-change", []);
            },
            onConfirm(data) {
                this.$emit("availibility-change", data);
            }
        }
    }
</script>