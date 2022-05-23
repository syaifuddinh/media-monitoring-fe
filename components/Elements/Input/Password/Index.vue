<template>
    <TextInput
        :label="label"
        :type="isShow ? 'text' : 'password'"
        :placeholder="placeholder"
        :class-name="classState"
        :right-icon="isShow ? 'eye-slash' : 'eye'"
        right-icon-variant="fontawesome"
        :margin-auto="true"
        @onRightIconClicked="switchPasswordVisibility"
        v-model="data"
    />
</template>

<script>
    import TextInput from '@elements/Input/Text/Index';

    export default {
        name: 'IndexPage',
        components: {
            TextInput
        },
        props: {
            value: {
                type: String,
                default: ""
            },
            label: {
                type: String,
                default: ""
            },
            className: {
                type: String,
                default: ""
            },
            placeholder: {
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
                isShow: false,
                type: "",
                rightIcon: ""
            }
        },
        mounted() {
            this.setClassState();
            this.setTextProperties();
        },
        methods: {
            onChange(e) {
                this.$emit("input", e.target.value);
            },
            switchPasswordVisibility() {
                this.isShow = !this.isShow;
            },
            switchVisiblity() {
                this.isShow = !this.isShow;
                this.setTextProperties();
            },
            setTextProperties() {
                if(this.isShow === true) {
                    this.type = "text";
                    this.rightIcon = "Hide.png";
                } else {
                    this.type = "password";
                    this.rightIcon = "Show.png";
                }
            },
            setClassState() {
                let classState = " ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>