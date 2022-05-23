<template>
    <div :class="classState + ' ' + className">
        <template>
            <div :class="marginAuto === true? 'mb-24px' : ''">
                <div class="mb-8px">
                    <ExtraSmallText
                        v-if="label"
                        display="inline-block"
                        :weight="600"
                    >
                        {{ label }}
                    </ExtraSmallText>
                    <ExtraSmallText
                        v-if="additionalLabel"
                        display="inline-block"
                        dark-theme-color="dark-grey"
                    >
                        {{ additionalLabel }}
                    </ExtraSmallText>
                </div>
                <div class="d-flex">
                    <Button
                        label="-"
                        :width="34"
                        :disabled="data === 0"
                        @click="decrement"
                    />
                    <TextInput
                        v-model="data"
                        @change="onChange"
                        type="number"
                        class-name="mx-8px"
                        :readonly="true"
                    />
                    <Button
                        label="+"
                        :width="34"
                        @click="increment"
                    />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import ExtraSmallText from '@elements/Text/ExtraSmall/Index';
    import TextInput from '@elements/Input/Text/Index';
    import Button from '@elements/Button/Index';

    export default {
        name: 'IndexPage',
        components: {
            Button,
            TextInput,
            ExtraSmallText
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            value: {
                type: String,
                default: ""
            },
            marginAuto: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: ""
            },
            additionalLabel: {
                type: String,
                default: ""
            },
            variant: {
                type: String,
                default: "primary"
            },
            placeholder: {
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
            rightIconVariant: {
                type: String,
                default: "fontawesome"
            },
            isShowRightButton: {
                type: Boolean,
                default: false
            },
            rightButtonLabel: {
                type: String,
                default: ""
            },
            type: {
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
            this.setClassState();
        },
        methods: {
            increment() {
                ++this.data;
            },
            decrement() {
                --this.data;
            },
            setClassState() {
                let classState = "bg-transparent ";
                classState += "overflow-hidden ";
                this.classState = classState;
            },
            onRightIconClicked() {
                const input = this.$refs.input;
                this.$emit("onRightIconClicked", input);
            },
            onChange(e) {
                this.$emit("input", e.target.value);
                this.$emit("change", e);
            } 
        }
    }
</script>