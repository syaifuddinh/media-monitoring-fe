<template>
    <SelectInput
        label="Sentimen"
        :options="items"
        :margin-auto="true"
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
                items.push({id:"", text: 'Semua'});
                items.push({id:"positif", text: 'Positif'});
                items.push({id:"negatif", text: 'Negatif'});
                items.push({id:"netral", text: 'Netral'});
                this.items = items;
            },
            onChange(e) {
                this.$emit("input", e.id);
                this.$emit("change", e);
            } 
        }
    }
</script>