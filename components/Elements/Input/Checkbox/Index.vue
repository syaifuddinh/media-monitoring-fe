<template>
    <span :class="classState + ' ' + className">
        <input
            v-model="data"
            type="checkbox"
            @change="onChange"
        >
    </span>
</template>

<script>

    export default {
        name: 'IndexPage',
        components: {
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            className: {
                type: String,
                default: ""
            },
            icon: {
                type: String,
                default: ""
            },
            rightIcon: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: ""
            },
            placeholder: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                classState: ""
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
        mounted() {
            this.setClassState();
        },
        methods: {
            onChange(e) {
                this.$emit("change");
            },
            setClassState() {
                const classState = "bg-transparent ";
                this.classState = classState;
            },
            onRightIconClicked() {
                const input = this.$refs.input;
                this.$emit("onRightIconClicked", input);
            }
        }
    }
</script>