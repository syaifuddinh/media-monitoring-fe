<template>
    <SelectInput
        label="Zona Waktu"
        :options="items"
        :margin-auto="true"
        v-model="data"
        @change="onChange"
    />
</template>

<script>
    import SelectInput from '@elements/Input/Select/Index';
    import RawData from "@models/Data/Timezone.json"

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
                const raw = RawData;
                const items = raw.map(value => {
                    const response = {};
                    let name = value.name;
                    name = name.replace("_", "");
                    response.id = name;
                    response.text = "(" + value.type + value.time +  ") " + name;

                    return response;
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