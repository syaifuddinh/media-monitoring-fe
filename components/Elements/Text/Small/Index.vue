<template>
    <span  :class="classState">
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
            weight: {
                type: Number,
                default: 400
            },
            paddingY: {
                type: Number,
                default: 0
            },
            paddingX: {
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
            marginTop: {
                type: Number,
                default: 0
            },
            marginBottom: {
                type: Number,
                default: 0
            },
            color: {
                type: String,
                default: "black"
            },
            darkThemeColor: {
                type: String,
                default: "white"
            },
            display: {
                type: String,
                default: ""
            },
            background: {
                type: String,
                default: ""
            },
            transform: {
                type: String,
                default: ""
            },
            align: {
                type: String,
                default: "left"
            },
            rounded: {
                type: Number,
                default: null
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
                let isUseDarkTheme = false;
                classState += "fs-14px ";
                classState += "text-" + this.align + " ";
                if(this.display) {
                    classState += "d-" + this.display + " ";
                } 

                if(this.marginLeft) {
                    classState += "ml-" + this.marginLeft + "px ";
                }

                if(this.marginRight) {
                    classState += "mr-" + this.marginRight + "px ";
                }

                if(this.paddingY) {
                    classState += "py-" + this.paddingY + "px ";
                }

                if(this.paddingX) {
                    classState += "px-" + this.paddingX + "px ";
                }

                if(this.marginTop) {
                    classState += "mt-" + this.marginTop + "px ";
                }

                if(this.marginBottom) {
                    classState += "mb-" + this.marginBottom + "px ";
                }

                if(this.background) {
                    classState += "bg-" + this.background + " ";
                } 

                if(this.transform) {
                    classState += "text-" + this.transform + " ";
                }

                if(this.rounded) {
                    classState += "rounded-" + this.rounded + "px ";
                } 

                classState += "font-weight-" + this.weight + " ";

                isUseDarkTheme = this.$store.state.Base.isUseDarkTheme === true && this.isDisableDarkTheme === false;
                if(isUseDarkTheme === true) {
                    classState += "text-" + this.darkThemeColor + " ";
                } else if(isUseDarkTheme === false) {
                    classState += "text-" + this.color + " ";
                    
                }
                
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>