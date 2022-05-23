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
                <div class="b-1 border-dark-grey rounded-8px d-flex justify-content-between align-items-center overflow-hidden">
                    <textarea
                        :class="'w-100 fs-16px py-8px px-12px b-0 bg-transparent ' + ($store.state.Base.isUseDarkTheme === true ? 'text-white' : '') + ' h-' + height + 'px'"
                        :placeholder="placeholder"
                        @keyup="onChange"
                        @change="onChange"
                        v-model="data"
                    >
                    </textarea>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import ExtraSmallText from '@elements/Text/ExtraSmall/Index';

    export default {
        name: 'IndexPage',
        components: {
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
            height: {
                type: Number,
                default: 86
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
            onChange(e) {
                this.$emit("input", e.target.value);
                this.$emit("change", e);
            } 
        }
    }
</script>