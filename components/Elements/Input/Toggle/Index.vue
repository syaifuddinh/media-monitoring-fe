<template>
    <div class="d-flex align-items-center">
        <toggle-button
            :sync="true"
            :value="false"
            :width="50"
            :switch-color="{checked: '#02001f', unchecked: 'white'}"
            color="#00CDB4"
            v-model="data"
            @input="onInput"
            @change="onChange"
        />

        <SmallText
            display="block"
            :margin-left="12"
        >
            {{ label }}
        </SmallText>
    </div>
</template>

<script>
    import SmallText from '@elements/Text/Small/Index';

    export default {
        name: 'IndexPage',
        components: {
            SmallText
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            label: {
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
                    console.log(modifiedValue);
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
            this.setClassState();
        },
        methods: {
            setClassState() {
                let classState = "bg-transparent ";
                classState += "overflow-hidden ";
                this.classState = classState;
            },
            onRightIconClicked() {
                const input = this.$refs.input;
                this.$emit("onRightIconClicked", input);
            },
            onInput(e) {
                this.$emit("input", e);
            },
            onChange(e) {
                this.$emit("change", e);
            } 
        }
    }
</script>