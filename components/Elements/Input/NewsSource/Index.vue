<template>
    <SelectInput
        label="Sumber Berita"
        :options="items"
        :margin-auto="true"
        v-model="data"
        @change="onChange"
    />
</template>

<script>
    import SelectInput from '@elements/Input/Select/Index';
    import NewsSource from '@endpoints/NewsSource';

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
                let items = [];
                const list = await NewsSource.list();
                items = list.map(({ name }) => {
                    return {id: name, text: name};
                });
                this.items = items;
            },
            onChange(e) {
                this.$emit("input", e.id);
                this.$emit("change", e);
            } 
        }
    }
</script>