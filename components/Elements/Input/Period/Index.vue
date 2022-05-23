<template>
    <SelectInput
        :options="items"
        v-model="data"
        @change="onChange"
    />
</template>

<script>
    import SelectInput from '@elements/Input/Select/Index';

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
            setItems() {
                const items = [];
                items.push({id:"month", text: 'Bulan'});
                items.push({id:"week", text: 'Minggu'});
                items.push({id:"daily", text: 'Harian'});
                this.items = items;
            },
            onChange(e) {
                this.$emit("input", e.id);
                this.$emit("change", e);
            } 
        }
    }
</script>