<template>
    <FileInput
        label="Logo Sponsor"
        primary-label="Ukuran 500x500"
        :margin-auto="true"
        accept="image/*"
        :max-size="2000000"
        @change="onChange"
    />
</template>

<script>
    import FileInput from '@elements/Input/File/Index';

    export default {
        name: 'IndexPage',
        components: {
            FileInput
        },
        props: {
        },
        data() {
            return {
                classState: "",
            }
        },
        mounted() {
        },
        methods: {
            onChange(e) {
                this.$emit("input", e);
                this.$emit("change", e);
            } 
        }
    }
</script>