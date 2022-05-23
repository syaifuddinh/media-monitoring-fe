<template>
    <div
        :class="classState"
        @click="switchDropdownVisibility"
    >
        <slot name="container"></slot>
        <div
            v-if="isShowContainer"
            class="d-flex align-items-center"
        >
            <div v-if="leftIcon" class="mr-9px">
                <Icon
                    :variant="leftIconVariant"
                    :src="leftIcon"
                    size="16"
                    :color="color"
                    dark-theme-color="dark-grey"
                />
            </div>
            <SmallText
                :dark-theme-color="labelColor"
                :color="labelColor"
                :weight="600"
                :margin-right="10"
            >
                {{ label }}
            </SmallText>
            <div>
                <Icon
                    variant="fontawesome"
                    :src="icon"
                    size="16"
                    :color="color"
                    dark-theme-color="dark-grey"
                />
            </div>
        </div>
        <Transition v-if="isShowItem">
            <ul
                v-show="isShown"
                ref="dropdownMenu"
                style="z-index:1000"
                :class="listClassState"
            >
                <slot name="default"></slot>
            </ul>
        </Transition>
    </div>
</template>

<script>
    import Icon from '@elements/Icon/Index';
    import SmallText from '@elements/Text/Small/Index';

    export default {
        name: 'IndexPage',
        components: {
            SmallText,
            Icon
        },
        props: {
            isShowContainer: {
                type: Boolean,
                default: true
            },
            isShowItem: {
                type: Boolean,
                default: true
            },
            leftIcon: {
                type: String,
                default: ""
            },
            rowDirection: {
                type: String,
                default: "bottom"
            },
            className: {
                type: String,
                default: ""
            },
            leftIconVariant: {
                type: String,
                default: "fontawesome"
            },
            label: {
                type: String,
                default: ""
            },
            labelColor: {
                type: String,
                default: "dark-grey"
            },
            variant: {
                type: String,
                default: "primary"
            },
            color: {
                type: String,
                default: ""
            },
            width: {
                type: Number,
                default: 170
            },
            autoHideDropdown: {
                type: Boolean,
                default: true
            },
            icon: {
                type: String,
                default: "angle-down"
            }
        },
        data() {
            return {
                isShown: false,
                classState: "",
                listClassState: ""
            }
        },
        mounted() {
            this.setClassState();
            this.setListClassState();
            this.onMounted();
        },
        methods: {
            setClassState() {
                let classState = "dropdown-container ";
                classState += " ";
                classState += "position-relative d-flex align-items-center ";
                classState += "cursor-pointer ";
                if(this.variant === "secondary") {
                    classState += "bg-dark ";
                    classState += "rounded-4px ";
                    classState += "py-8px px-10px ";
                } else if(this.variant === "tertiary") {
                    classState += "bg-dark ";
                    classState += "rounded-4px ";
                    classState += "py-5px px-9px ";
                }
                this.classState += this.className;


                this.classState = classState
            },
            initiateCloseEvent() {
                const onClose = (e) => {
                    setTimeout(() => {
                        const target = e.target.closest(".dropdown-container");
                        if(!target) {
                            this.isShown = false;
                            window.removeEventListener("click", onClose);
                        }
                    }, 400);
                }
                window.addEventListener("click", onClose);
            },
            onMounted() {
                this.$emit("load", this.hideDropdown)
            },
            setListClassState() {
                let className = "list-group position-absolute b-1 right-0 border-dark-grey w-" + this.width + "px "; 
                if(this.rowDirection === "bottom") {
                    className += "top-28 ";
                } else if(this.rowDirection === "top") {
                    className += "bottom-45 ";
                }
                this.listClassState = className;
            },
            switchDropdownVisibility() {
                this.isShown = !this.isShown;
                if(this.isShown === true) {
                    this.initiateCloseEvent();
                }
                this.$emit("click", this.hideDropdown)

            },
            onContainerClicked() {
                if(this.autoHideDropdown === true) {
                    this.hideDropdown();
                }
                this.$emit("click", this.hideDropdown)
            },
            hideDropdown() {
                this.isShown = false;
            }
        }
    }
</script>