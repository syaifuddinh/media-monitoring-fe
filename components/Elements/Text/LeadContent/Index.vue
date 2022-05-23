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
            display: {
                type: String,
                default: ""
            },
            weight: {
                type: Number,
                default: 600
            },
            paddingX: {
                type: Number,
                default: 0
            },
            marginY: {
                type: Number,
                default: 0
            },
            marginBottom: {
                type: Number,
                default: 0
            },
            marginTop: {
                type: Number,
                default: 0
            },
            color: {
                type: String,
                default: ""
            },
            darkThemeColor: {
                type: String,
                default: "white"
            },
            font: {
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
                    classState += "text-" + this.darkThemeColor + " ";
                } else if(isUseDarkTheme === false){
                    if(this.color) {
                        classState += "text-" + this.color + " ";
                    } else {
                        classState += "text-black ";
                    }
                }
                classState += "fs-24px ";
                classState += "text-" + this.align + " ";
                if(this.font) {
                    classState += "font-" + this.font + " ";
                }

                classState += "font-weight-" + this.weight + " ";

                if(this.display) {
                    classState += "d-" + this.display + " ";
                }
                if(this.transform) {
                    classState += "text-" + this.transform + " ";
                }
                if(this.marginY) {
                    classState += "my-" + this.marginY + "px ";
                }
                if(this.paddingX) {
                    classState += "px-" + this.paddingX + "px ";
                }
                if(this.marginBottom) {
                    classState += "mb-" + this.marginBottom + "px ";
                }
                if(this.marginTop) {
                    classState += "mt-" + this.marginTop + "px ";
                }
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>