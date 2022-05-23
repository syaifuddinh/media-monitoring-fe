<template>
    <TextCopyInput
        v-model="data"
    />
</template>

<script>
    import TextCopyInput from "@elements/Input/TextCopy/Index";

    export default {
        name: 'IndexPage',
        components: {
            TextCopyInput
        },
        props: {
            eventId: {
                type: String,
                required: true
            },
            value: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                data: "",
                classState: ""
            }
        },
        mounted() {
            this.data = this.$config.onairUrl + "/" + this.eventId;
        },
        methods: {
            onChange(e) {
                this.$emit("input", e.target.value);
                this.$emit("change", e);
            } 
        }
    }
</script>