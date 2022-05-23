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
            background: {
                type: String,
                default: "transparent"
            },
            isDisableDarkTheme: {
                type: Boolean,
                default: false
            },
            darkThemeColor: {
                type: String,
                default: "white"
            },
            display: {
                type: String,
                default: ""
            },
            weight: {
                type: Number,
                default: 400
            },
            color: {
                type: String,
                default: ""
            },
            font: {
                type: String,
                default: ""
            },
            marginTop: {
                type: Number,
                default: 0
            },
            marginBottom: {
                type: Number,
                default: 0
            },
            marginRight: {
                type: Number,
                default: 0
            },
            transform: {
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
                    classState += "text-" + this.darkThemeColor + " ";
                } else if(isUseDarkTheme === false){
                    if(this.color) {
                        classState += "text-" + this.color + " ";
                    } else {
                        classState += "text-black ";
                    }
                }
                classState += "fs-16px ";
                classState += "font-weight-" + this.weight + " ";
                classState += "bg-" + this.background + " ";

                if(this.marginTop) {
                    classState += "mt-" + this.marginTop + "px ";
                }

                if(this.marginBottom) {
                    classState += "mb-" + this.marginBottom + "px ";
                }

                if(this.marginRight) {
                    classState += "mr-" + this.marginRight + "px ";
                }

                if(this.font) {
                    classState += "font-" + this.font + " ";
                }
                if(this.transform) {
                    classState += "text-" + this.transform + " ";
                }
                if(this.display) {
                    classState += "d-" + this.display + " ";
                }
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>