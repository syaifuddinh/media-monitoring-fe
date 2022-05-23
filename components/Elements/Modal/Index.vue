<template>
    <div>
        <div @click="show" class="modal-trigger">
            <slot name="trigger"></slot>
        </div>
        <div ref="modal" v-show="isShown || isDisplay">
            <Transition>
                <div v-if="isElementShown || isDisplay" class="position-fixed h-100 w-100 bg-black top-0 left-0 z-index-4 opacity-6"></div>
            </Transition>
            <div class="position-fixed h-100 w-100 top-0 left-0 z-index-20 d-flex align-items-center justify-content-center">
                <Transition name="zoom">
                    <div v-if="isElementShown || isDisplay" :class="classState">
                        <div>
                            <div class="d-inline-flex align-items-center">
                                <div
                                    v-if="isShowRollback" 
                                    @click="onRollback"
                                    class="mr-18px"
                                >
                                    <Icon
                                        variant="fontawesome"
                                        src="arrow-left"
                                        size="24"
                                    />
                                </div>
                                <SemiLeadContentText
                                    v-if="title"
                                    float="left"
                                    :weight="700"
                                >
                                    {{ title }}
                                </SemiLeadContentText>
                            </div>
                            <div
                                v-if="buttonVariant === 'primary' && isShowTimesIcon"
                                :class="'closeModalButton float-right ' + closeButtonClass"
                                id="closeModalButton"
                                @click="close"
                            >
                                <Icon
                                    variant="fontawesome"
                                    src="times"
                                    size="24"
                                    class-name="hover-text-dark-grey"
                                />
                                <div></div>
                            </div>
                            <div
                                v-if="buttonVariant === 'secondary'"
                                class="float-right w-30"
                            >
                                <div
                                    class="w-100 d-flex justify-content-center"
                                >
                                    <Button
                                        :label="confirmButtonLabel"
                                        :disabled="isConfirmButtonDisabled"
                                        :is-loading="isConfirmButtonLoading"
                                        :variant="confirmButtonVariant"
                                        :padding-y="16"
                                        @click="confirm"
                                    />                
                                    <Button
                                        v-if="isShowCancelButton === true"
                                        @click="close"
                                        label="Batal"
                                        :variant="cancelButtonVariant"
                                        :margin-left="12"
                                        :padding-y="16"
                                    />                
                                </div>
                            </div>
                        </div>

                        <slot name="main"></slot>

                        <div
                            v-if="useConfirmButton === true"
                            class="w-100 d-flex justify-content-center"
                        >
                            <Button
                                v-if="isShowConfirmButton === true"
                                :label="confirmButtonLabel"
                                :disabled="isConfirmButtonDisabled"
                                :is-loading="isConfirmButtonLoading"
                                :variant="confirmButtonVariant"
                                :padding-y="16"
                                @click="confirm"
                            />                
                            <Button
                                v-if="isShowCancelButton === true"
                                @click="close"
                                label="Batal"
                                :variant="cancelButtonVariant"
                                :margin-left="12"
                                :padding-y="16"
                                class-name="closeModalButton"
                            />                
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from "@elements/Icon/Index";
    import Button from "@elements/Button/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";

    export default {
        name: 'IndexPage',
        components: {
            Icon,
            SemiLeadContentText,
            Button
        },
        props: {
            closeButtonClass: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                default: ""
            },
            align: {
                type: String,
                default: "between"
            },
            className: {
                type: String,
                default: ""
            },
            background: {
                type: String,
                default: ""
            },
            buttonVariant: {
                type: String,
                default: "primary"
            },
            display: {
                type: String,
                default: "inline-block"
            },
            width: {
                type: Number,
                default: 40
            },
            paddingX: {
                type: Number,
                default: 31
            },
            paddingY: {
                type: Number,
                default: 31
            },
            height: {
                type: Number,
                required: 332
            },
            cancelButtonVariant: {
                type: String,
                default: "primary"
            },
            confirmButtonVariant: {
                type: String,
                default: "outline-danger"
            },
            confirmButtonLabel: {
                type: String,
                default: "Ya"
            },
            useConfirmButton: {
                type: Boolean,
                default: true
            },
            usePortal: {
                type: Boolean,
                default: true
            },
            isShowTimesIcon: {
                type: Boolean,
                default: true
            },
            isDisplay: {
                type: Boolean,
                default: false
            },
            isShowCancelButton: {
                type: Boolean,
                default: true
            },
            isShowConfirmButton: {
                type: Boolean,
                default: true
            },
            isShowRollback: {
                type: Boolean,
                default: false
            },
            isConfirmButtonLoading: {
                type: Boolean,
                default: false
            },
            isConfirmButtonDisabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                classState: "",
                isElementShown: false,
                isShown: false
            }
        },
        mounted() {
            this.setClassState();
            this.onLoad();
        },
        methods: {
            setClassState() {
                let classState = "";
                classState += "w-" + this.width + " ";
                classState += "h-" + this.height + "px ";
                classState += "rounded-8px ";
                if(this.$store.state.Base.isUseDarkTheme === true) {
                    classState += "bg-light-dark ";
                } else {
                    classState += "bg-white ";
                }
                classState += "px-" + this.paddingX + "px ";
                classState += "py-" + this.paddingY + "px ";
                classState += "d-flex flex-column justify-content-" + this.align + " ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
            confirm() {
                this.$emit("confirm", this.close);
            },
            show() {
                this.onOpen();
                this.isShown = !this.isShown;
                this.isElementShown = !this.isElementShown;
            },
            close() {
                this.isElementShown = false;
                this.isShown = false;
                this.$emit("close");
            },
            onRollback() {
                this.$emit("rollback");
            },
            onOpen() {
                this.$emit("open");
            },
            onLoad() {
                if(this.usePortal === true) {
                    const modal = this.$refs.modal;
                    window.document.body.appendChild(modal);
                }
                this.$emit("load", this.close);
            }
        }
    }
</script>