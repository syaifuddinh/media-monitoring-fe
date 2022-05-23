<template>
    <div>
        <TextInput
            label="Nama Video"
            placeholder="Nama Video"
            :margin-auto="true"
            v-model="name"
            @change="onChange"
        />
        <TextInput
            label="Link Video"
            placeholder="https://"
            :margin-auto="true"
            v-model="url"
            @change="onChange"
        />
    </div>
</template>

<script>
    import TextInput from "@elements/Input/Text/Index";

    export default {
        name: 'IndexPage',
        components: {
            TextInput
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
                url: ""
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
            onChange() {
                const name = this.name;
                const url = this.url;
                this.$emit("change", { name, url });
            }
        }
    }
</script>