<template>
    <FileInput
        label="Thumbnail Meeting"
        primary-label="Ukuran 500x500"
        :margin-auto="true"
        accept="image/*"
        preview-image-variant="full"
        :max-size="2000000"
        :height="200"
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