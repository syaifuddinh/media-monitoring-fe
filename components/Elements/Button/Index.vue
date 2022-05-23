<template>
    <span :class="containerClass + ' ' + className">
        <template v-if="!isLoading">
            <button
                type="button"
                :class="classState"
                @click="onButtonClicked"
            >
                <span
                    v-if="leftIcon"
                    class="d-inline-block mr-5px"
                >
                    <Icon
                        :src="leftIcon"
                        :variant="leftIconVariant"
                        :color="iconColor"
                        :dark-theme-color="iconColor"
                        height="24"
                        width="auto"
                    />
                </span>
                {{ this.label }}
            </button>
            <div
                v-if="disabled === true"
                class="position-absolute w-100 h-100 top-0 left-0 cursor-not-allowed"
            >
            </div>
        </template>
        <template v-if="isLoading">
            <button
                type="button"
                class="w-100 fs-16px b-0 py-10px rounded-12px font-weight-600 text-white bg-dark-grey"
            >
                {{ this.label }}
            </button>
            <div
                class="position-absolute w-100 h-100 top-0 left-0 cursor-not-allowed"
            >
            </div>
        </template>
    </span>
</template>

<script>
    import Icon from "@elements/Icon/Index";

    export default {
        name: 'IndexPage',
        components: {
            Icon
        },
        props: {
            marginTop: {
                type: Number,
                default: 0
            },
            marginBottom: {
                type: Number,
                default: 0
            },
            marginLeft: {
                type: Number,
                default: 0
            },
            marginRight: {
                type: Number,
                default: 0
            },
            paddingY: {
                type: Number,
                default: 10
            },
            transform: {
                type: String,
                default: "capitalize"
            },
            float: {
                type: String,
                default: "none"
            },
            leftIconVariant: {
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
            width: {
                type: Number,
                default: 0
            },
            variant: {
                type: String,
                default: ""
            },
            leftIcon: {
                type: String,
                default: ""
            },
            disabled: {
                type: Boolean,
                default: false
            },
            isLoading: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                classState: "",
                iconColor: "",
                containerClass: ""
            }
        },
        updated() {
            this.setClassName();
        },
        mounted() {
            this.setClassName();
            this.setContainerClass();
        },
        methods: {
            onButtonClicked() {
                this.$emit("click");
            },
            setContainerClass() {
                let containerClass = "position-relative d-inline-flex align-items-center ";
                containerClass += "float-" + this.float + " ";
                containerClass += "cursor-pointer ";
                if(this.width) {
                    containerClass += "w-" + this.width + "px ";
                } else {
                    containerClass += "w-100 ";
                }
                this.containerClass = containerClass;
            },
            setClassName() {
                let classState = "";
                classState += "konect-button ";
                classState += "w-100 ";
                classState += "fs-16px ";
                classState += "b-0 ";
                classState += "py-" + this.paddingY + "px ";
                classState += "rounded-12px ";
                classState += "font-weight-600 ";
                classState += "text-" + this.transform + " ";
                classState += "mt-" + this.marginTop + "px ";
                classState += "mb-" + this.marginBottom + "px ";
                classState += "ml-" + this.marginLeft + "px ";
                classState += "mr-" + this.marginRight + "px ";
                if(this.disabled === true) {                    
                    classState += "text-white ";
                    classState += "bg-dark-grey ";
                } else if(!this.variant || this.variant === "primary") {
                    classState += "text-white ";
                    classState += "bg-primary ";
                    classState += "hover-box-shadow-primary ";
                } else if(this.variant === "danger") {
                    classState += "text-white ";
                    classState += "bg-danger ";
                    classState += "hover-bg-danger ";
                    this.iconColor = "white";
                } else if(this.variant === "dark") {
                    classState += "text-white ";
                    classState += "bg-dark ";
                    classState += "hover-bg-dark ";
                    this.iconColor = "white";
                } else if(this.variant === "purple") {
                    classState += "text-white ";
                    classState += "bg-purple ";
                    classState += "hover-box-shadow-purple ";
                    this.iconColor = "white";
                } else if(this.variant === "white-primary") {
                    classState += "text-primary ";
                    classState += "hover-text-primary ";
                    classState += "bg-white ";
                    classState += "hover-bg-white ";
                    this.iconColor = "primary";
                } else if(this.variant === "outline-primary") {
                    classState += "text-primary ";
                    classState += "hover-text-primary ";
                    classState += "bg-transparent ";
                    classState += "b-1 ";
                    classState += "border-primary ";
                    this.iconColor = "primary";
                } else if(this.variant === "outline-danger") {
                    classState += "text-danger ";
                    classState += "hover-text-danger ";
                    classState += "bg-transparent ";
                    classState += "b-1 ";
                    classState += "border-danger ";
                    this.iconColor = "danger";
                } else if(this.variant === "link-primary") {
                    classState += "text-primary ";
                    classState += "hover-text-primary ";
                    classState += "bg-transparent ";
                    this.iconColor = "primary";
                } else if(this.variant === "link-purple") {
                    classState += "text-purple ";
                    classState += "hover-text-purple ";
                    classState += "bg-transparent ";
                    this.iconColor = "primary";
                } else if(this.variant === "dotted-primary") {
                    classState += "text-primary ";
                    classState += "very-darken-bg-primary ";
                    classState += "b-1 ";
                    classState += "border-dashed ";
                    classState += "border-primary ";
                    this.iconColor = "primary";
                } else if(this.variant === "link-dark-grey") {
                    classState += "text-dark-grey ";
                    classState += "hover-text-dark-grey ";
                    classState += "bg-transparent ";
                    this.iconColor = "dark-grey";
                } else if(this.variant === "link-danger") {
                    classState += "text-danger ";
                    classState += "hover-text-danger ";
                    classState += "hover-box-shadow-primary ";
                    classState += "bg-transparent ";
                    this.iconColor = "danger";
                } else if( this.variant === "dark-grey") {
                    classState += "text-white ";
                    classState += "bg-dark-grey ";
                    classState += "hover-bg-dark-grey ";
                    this.iconColor = "white";
                } else if(this.variant === "white-dark-grey") {
                    classState += "text-dark-grey ";
                    classState += "bg-white ";
                    this.iconColor = "dark-grey";
                } else if(this.variant === "outline-dark-grey") {
                    classState += "text-dark-grey ";
                    classState += "bg-transparent ";
                    classState += "b-1 ";
                    classState += "border-dark-grey ";
                    this.iconColor = "dark-grey";
                } else if(this.variant === "white-purple") {
                    classState += "text-purple ";
                    classState += "bg-white ";
                    this.iconColor = "purple"
                }

                this.classState = classState;
            }
        }
    }
</script>