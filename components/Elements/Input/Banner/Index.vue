<template>
    <FileInput
        label="Banner"
        primary-label="Ukuran 500x500"
        :margin-auto="true"
        accept="image/*"
        :max-size="2000000"
        upload-description="Jatuhkan file foto di sini atau klik untuk mengunggah <br>(Maks. 2 MB)"
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