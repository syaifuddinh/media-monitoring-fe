<template>
    <SelectInput
        label="Role"
        :options="items"
        :margin-auto="true"
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
                items.push({id:1, text: 'Host'});
                items.push({id:2, text: 'Speaker'});
                this.items = items;
            },
            onChange(e) {
                this.$emit("input", e.id);
                this.$emit("change", e);
            } 
        }
    }
</script>