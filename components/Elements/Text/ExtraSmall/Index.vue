<template>
    <span :class="classState">
        <slot></slot>    
    </span>
</template>

<script>
    export default {
        name: 'IndexPage',
        props: {
            className: {
                type: String,
                default: ""
            },
            isDisableDarkTheme: {
                type: Boolean,
                default: false
            },
            transform: {
                type: String,
                default: ""
            },
            align: {
                type: String,
                default: "inherit"
            },
            weight: {
                type: Number,
                default: 400
            },
            padding: {
                type: Number,
                default: 0
            },
            paddingX: {
                type: Number,
                default: 0
            },
            paddingY: {
                type: Number,
                default: 0
            },
            border: {
                type: Number,
                default: 0
            },
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
            radius: {
                type: Number,
                default: 0
            },
            color: {
                type: String,
                default: ""
            },
            background: {
                type: String,
                default: "transparent"
            },
            borderColor: {
                type: String,
                default: "transparent"
            },
            darkThemeColor: {
                type: String,
                default: "white"
            },
            display: {
                type: String,
                default: ""
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
                const isUseDarkTheme = this.$store.state.Base.isUseDarkTheme === true && this.isDisableDarkTheme === false;
                if(isUseDarkTheme === true) {
                    classState += "text-" + this.darkThemeColor + " " ;
                } else if(isUseDarkTheme === false){
                    if(this.color) {
                        classState += "text-" + this.color + " ";
                    } else {
                        classState += "text-secondary-black ";
                    }
                }
                classState += "fs-12px ";
                classState += "font-weight-" + this.weight + " ";
                classState += "text-" + this.align + " ";
                classState += "border-" + this.borderColor + " ";
                classState += "bg-" + this.background + " ";

                if(this.transform) {
                    classState += "text-" + this.transform + " ";
                }

                if(this.display) {
                    classState += "d-" + this.display + " ";
                }

                if(this.padding) {
                    classState += "p-" + this.padding + "px ";
                }

                if(this.paddingX) {
                    classState += "px-" + this.paddingX + "px ";
                }

                if(this.paddingY) {
                    classState += "py-" + this.paddingY + "px ";
                }

                if(this.radius) {
                    classState += "rounded-" + this.radius + "px ";
                }

                if(this.border) {
                    classState += "b-" + this.border + " ";
                }

                if(this.marginTop) {
                    classState += "mt-" + this.marginTop + "px ";
                }

                if(this.marginBottom) {
                    classState += "mb-" + this.marginBottom + "px ";
                }

                if(this.marginLeft) {
                    classState += "ml-" + this.marginLeft + "px ";
                }

                if(this.marginRight) {
                    classState += "mr-" + this.marginRight + "px ";
                }

                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>