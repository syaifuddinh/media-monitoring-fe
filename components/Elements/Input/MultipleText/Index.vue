<template>
    <div :class="classState + ' ' + className">
        <template>
            <div :class="marginAuto === true? 'mb-24px' : ''">
                <TextInput
                    v-model="text"
                    :label="label"
                    :placeholder="placeholder"
                    @keyup="onKeyup"
                    @keydown="onKeydown"
                />

                <div class="d-flex mt-12px">
                    <PrimaryChip
                        :key="list.length"
                        :items="list"
                        :is-highlighted="false"
                        :is-show-close-button="true"
                        @remove="onRemove"
                    />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import TextInput from '@elements/Input/Text/Index';
    import PrimaryChip from '@elements/Chip/Primary/Index';

    export default {
        name: 'IndexPage',
        components: {
            PrimaryChip,
            TextInput
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
                    this.$emit('input', modifiedValue);
                }
            }
        },
        data() {
            return {
                text: "",
                list: [],
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
            emitData() {
                const data = this.list.map(value => value.label);
                this.$emit("input", data);
            },
            onKeydown(e) {
                const key = e.key;
                if(
                   key === "," ||
                   key === ";"
                ) {
                    e.preventDefault();
                }
            },
            onKeyup(e) {
                const key = e.key;
                if(
                   key === "Enter" ||
                   key === "," ||
                   key === ";"
                ) {
                    this.setList();
                    this.emitData();
                }
            },
            onRemove(data) {
                console.log(data);
                this.list = this.list.filter(value => value.key !== data.key);
                this.emitData();
            },
            setList() {
                const key = window.Math.round(Math.random() * 9999999999);
                const response = {
                    label: this.text,
                    key,
                };
                this.list.push(response);
                this.text = "";
            },
            onChange(e) {
                this.$emit("input", e.target.value);
                this.$emit("change", e);
            } 
        }
    }
</script>