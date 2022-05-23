<template>
    <SelectInput
        label="Tambah Speaker"
        additional-label="(opsional)"
        :options="items"
        :margin-auto="true"
        v-model="data"
        @change="onChange"
    />
</template>

<script>
    import SelectInput from '@elements/Input/MultipleSelect/Index';
    import Speaker from '@endpoints/Event/Speaker';

    export default {
        name: 'IndexPage',
        components: {
            SelectInput
        },
        props: {
            value: {
                type: String,
                default: ""
            }
        },
        computed: {
            data: {
                get() {
                    return this.value;
                },
                set(modifiedValue) {
                    this.$emit('input', modifiedValue);
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
            async setItems() {
                let items = await Speaker.list();
                items = items.map(value => {
                    const response = {};
                    response.id = value.id;
                    response.text = value.email;

                    return response;
                });
                this.items = items;
            },
            onChange(e) {
                console.log(e);
                this.$emit("input", e);
                this.$emit("change", e);
            } 
        }
    }
</script>