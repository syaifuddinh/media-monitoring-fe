<template>
    <div :class="marginAuto === true? 'mb-24px' : ''">
        <div class="mb-3px">
            <ExtraSmallText
                v-if="label"
                display="inline-block"
                :weight="600"
            >
                {{ label }}
            </ExtraSmallText>
            <ExtraSmallText
                v-if="primaryLabel"
                display="inline-block"
                color="primary"
                dark-theme-color="primary"
                :margin-left="8"
            >
                {{ primaryLabel }}
            </ExtraSmallText>
            <ExtraSmallText
                v-if="additionalLabel"
                display="inline-block"
                color="dark-grey"
                dark-theme-color="dark-grey"
                :margin-left="8"
            >
                {{ additionalLabel }}
            </ExtraSmallText>
        </div>

        <div :class="$store.state.Base.isUseDarkTheme ? 'dark-theme' : ''">
            <Select2
                :options="options"
                @select="onChange"
                v-model="data"
            />
        </div>
    </div>
</template>

<script>
    import ExtraSmallText from '@elements/Text/ExtraSmall/Index';
    import Select2 from 'v-select2-component';
    import '~/assets/css/select2.css';

    export default {
        name: 'IndexPage',
        components: {
            Select2,
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
            options: {
                type: Object,
                default: () => {}
            },
            marginAuto: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: ""
            },
            primaryLabel: {
                type: String,
                default: ""
            },
            additionalLabel: {
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
            setClassState() {
                let classState = "";
                classState += "";
                this.classState = classState;

                setTimeout(() => {
                    const select2 = window.document.querySelector(".select2-container");
                    if(select2) {
                        select2.setAttribute("style", "width:100%");
                    }
                }, 800);
            },
            
            onChange(e) {
                this.$emit("input", e.id);
                this.$emit("change", e);
            } 
        }
    }
</script>