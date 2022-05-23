<template>
    <div ref="container" class="w-100">
        <TextInput
            v-model="data"
            :is-show-right-button="true"
            right-button-label="Salin"
            @right-button-click="copyText"
            :readonly="true"
            class-name="w-100"
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
                classState: ""
            }
        },
        mounted() {
        },
        methods: {
            copyText() {
                const textArea = document.createElement("textarea");
                const container = this.$refs.container;
                textArea.value = this.data;                  
                container.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    window.document.execCommand('copy');
                    this.$toast.success("Tersalin");
                } catch (err) {
                    this.$toast.success("Unable to copy!");
                }

                container.removeChild(textArea);
            },
            onChange(e) {
                this.$emit("input", e.target.value);
                this.$emit("change", e);
            } 
        }
    }
</script>