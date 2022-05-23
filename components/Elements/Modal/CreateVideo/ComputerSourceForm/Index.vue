<template>
    <div>
        <TextInput
            label="Nama Video"
            placeholder="Nama Video"
            class-name="mb-16px"
            v-model="name"
            @change="onChange"
        />
        <FileInput
            class="mb-16px"
            v-model="file"
            variant="tus"
            extension="mp4"
            upload-description="Jatuhkan file video di sini atau klik untuk mengunggah"
            accept="video/mp4"
            @change="onFileChange"
            @progress="onProgress"
        />
    </div>
</template>

<script>
    import TextInput from "@elements/Input/Text/Index";
    import FileInput from "@elements/Input/File/Index";

    export default {
        name: 'IndexPage',
        components: {
            TextInput,
            FileInput
        },
        props: {
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                name: "",
                file: null,
                fileName: "",
                fileSize: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setClassState() {
                let classState = "";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
            onFileChange(file) {
                if(file) {
                    this.fileName = file.name;
                    this.fileSize = file.size;
                } else {
                    this.fileName = null;
                    this.fileSize = 0;                    
                    this.$emit("progress", 0);
                }
                this.onChange();
            },
            onProgress(percent) {
                this.$emit("progress", percent);
            },
            onChange() {
                const name = this.name;
                const fileName = this.fileName;
                const fileSize = this.fileSize;
                this.$emit("change", { name, fileName, fileSize });
            }
        }
    }
</script>