<template>
    <div :class="classState + ' ' + className">
        <template v-if="variant === 'secondary'">
            <div
                class="d-flex align-items-center mb-1px overflow-hidden"
            >
                <Icon
                    v-if="icon"
                    :src="icon"
                    height="24"
                    class-name="w-auto"
                />
                <input
                    ref="input"
                    :type="type ? type : 'text'"
                    class="w-100 fs-16px text-black b-0 outline-0 outline-focus-visible-0 p-2"
                    :placeholder="placeholder"
                    @input="onChange"
                />
                <div
                    @click="onRightIconClicked()"
                >
                    <Icon
                        v-if="rightIcon"
                        :src="rightIcon"
                        :key="rightIcon"
                        height="24"
                        class-name="w-auto"
                    />
                </div>
            </div>
            <LineRuler />
        </template>
        <template v-if="variant === 'primary'">
            <div :class="marginAuto === true? 'mb-24px' : ''">
                <ExtraSmallText
                    v-if="label"
                    display="block"
                    :weight="600"
                    :margin-bottom="8"
                >
                    {{ label }}
                </ExtraSmallText>
                <div class="b-1 border-dark-grey rounded-8px d-flex justify-content-between align-items-center">
                    <div v-if="type === 'date'" class="px-10px">
                        <Icon
                            variant="fontawesome"
                            src="calendar-alt"
                            size="16"
                        />
                    </div>
                    <input
                        v-if="type === 'text' || type === 'email' || type === 'password' || type === 'number' || type === 'currency'"
                        v-model="data"
                        :type="type"
                        :class="'w-100 fs-16px py-8px px-12px b-0 bg-transparent ' + ($store.state.Base.isUseDarkTheme === true ? 'text-' + darkThemeColor : '')"
                        :placeholder="placeholder"
                        :readonly="readonly"
                        @input="onChange"
                        @keyup="onKeyup"
                        @keydown="onKeydown"
                        @blur="isInputActive = false"
                        @focus="isInputActive = true"
                    >
                    <date-picker
                        v-if="type === 'date'"
                        @selected="onDateChange"
                        v-model="data"
                        format="dd/MM/yyyy"
                        :placeholder="placeholder"
                        wrapper-class="w-100"
                        :input-class="'w-100 fs-16px py-8px px-12px b-0 bg-transparent ' + ($store.state.Base.isUseDarkTheme === true ? 'text-white' : '')"
                    />

                    <TimePicker
                        v-if="type === 'time'"
                        :time-str="['Jam', 'Menit', 'Detik']"
                        :placeholder="placeholder"
                        btn-str="Submit"
                        type="minute"
                        v-model="data"
                        :class="$store.state.Base.isUseDarkTheme ? 'dark-theme' : ''"
                        @input="onTimeChange"
                    />
                    <div
                        v-if="rightIcon"
                        class="px-12px"
                        @click="onRightIconClicked"
                    >
                        <Icon
                            :variant="rightIconVariant"
                            :src="rightIcon"
                            :key="rightIcon"
                            color="dark-grey"
                            dark-theme-color="dark-grey"
                        />
                    </div>
                    <div
                        v-if="isShowRightButton === true"
                        class="p-10px h-100 bg-primary cursor-pointer hover-bg-primary rounded-top-right-8px rounded-bottom-right-8px"
                        @click="rightButtonClicked"
                    >
                        <NormalText
                            :weight="600"
                        >
                            {{ rightButtonLabel }}
                        </NormalText>  
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import moment from 'moment';
    import LineRuler from '@elements/LineRuler/Index';
    import Icon from '@elements/Icon/Index';
    import NormalText from '@elements/Text/Normal/Index';
    import ExtraSmallText from '@elements/Text/ExtraSmall/Index';

    export default {
        name: 'IndexPage',
        components: {
            ExtraSmallText,
            NormalText,
            LineRuler,
            Icon
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
            label: {
                type: String,
                default: ""
            },
            variant: {
                type: String,
                default: "primary"
            },
            darkThemeColor: {
                type: String,
                default: "white"
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
            marginAuto: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            rightButtonLabel: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: "text"
            }
        },
        computed: {
            data: {
                get() {
                    if(this.type === "currency") {
                        if (this.isInputActive) {
                            return this.value.toString()
                        } else {
                            // User is not modifying now. Format display value for user interface
                            return "IDR " + parseInt(this.value).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                        }
                    } else if(this.type === "date") {
                        let readableDate = "";
                        let dateLabel = "";
                        if(this.value) {
                            dateLabel = moment(new Date(this.value)).format("MM/DD/YYYY");
                            readableDate = moment(new Date(this.value)).format("YYYY-MM-DD");
                        }
                        this.$emit('input', readableDate);
                        return dateLabel;
                    } else {
                        return this.value;
                    }
                },
                set(modifiedValue) {
                    if(this.type === "currency") {
                        let newValue = parseFloat(modifiedValue.replace(/[^\d.]/g, ""))
                        if (isNaN(newValue)) {
                            newValue = 0
                        }
                        this.$emit('input', newValue)
                    } else if(this.type === "date") {
                        let newValue = "";
                        if(modifiedValue) {
                            newValue = moment(modifiedValue).format("YYYY-MM-DD");
                        }
                        this.$emit('input', newValue)
                    }
                }
            }
        },
        data() {
            return {
                isInputActive: false,
                classState: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setClassState() {
                let classState = "bg-transparent ";
                classState += "w-100 ";
                if(this.type !== 'date' && this.type !== 'time') {
                    classState += "overflow-hidden ";
                }
                this.classState = classState;
            },
            onRightIconClicked() {
                const input = this.$refs.input;
                this.$emit("onRightIconClicked", input);
            },
            onChange(e) {
                this.$emit("input", e.target.value);
                this.$emit("change", e);
            },
            onKeyup(e) {
                this.$emit("keyup", e);
            },
            onKeydown(e) {
                this.$emit("keydown", e);
            },
            onDateChange(e) {
                const value = moment(e).format("YYYY-MM-DD");
                this.$emit("input", value);
                this.$emit("change", value);
            },
            rightButtonClicked() {
                this.$emit("right-button-click");
            },
            onTimeChange(e) {
                const value = e;
                this.$emit("input", value);
                this.$emit("change", value);
            } 
        }
    }
</script>