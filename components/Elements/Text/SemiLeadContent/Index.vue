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
            display: {
                type: String,
                default: ""
            },
            float: {
                type: String,
                default: ""
            },
            align: {
                type: String,
                default: "left"
            },
            weight: {
                type: Number,
                default: 400
            },
            marginLeft: {
                type: Number,
                default: 0
            },
            marginTop: {
                type: Number,
                default: 0
            },
            radius: {
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
            color: {
                type: String,
                default: ""
            },
            background: {
                type: String,
                default: ""
            },
            font: {
                type: String,
                default: ""
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
                classState += "fs-20px ";
                if(this.font) {
                    classState += "font-" + this.font + " ";
                }
                if(this.radius) {
                    classState += "rounded-" + this.radius + "px ";
                }
                if(this.paddingX) {
                    classState += "px-" + this.paddingX + "px ";
                }
                if(this.paddingY) {
                    classState += "py-" + this.paddingY + "px ";
                }
                if(this.transform) {
                    classState += "text-" + this.transform + " ";
                }

                if(this.marginLeft) {
                    classState += "ml-" + this.marginLeft + "px ";
                }

                if(this.marginTop) {
                    classState += "mt-" + this.marginTop + "px ";
                }

                classState += "font-weight-" + this.weight + " ";
                classState += "text-" + this.align + " ";

                if(this.$store.state.Base.isUseDarkTheme === true) {
                    classState += "text-white ";
                } else if(this.$store.state.Base.isUseDarkTheme === false) {
                    if(this.color) {
                        classState += "text-" + this.color + " ";
                    } else {
                        classState += "text-black ";
                    }
                }

                if(this.display) {
                    classState += "d-" + this.display + " ";
                }

                if(this.float) {
                    classState += "float-" + this.float + " ";
                }
                if(this.background) {
                    classState += "bg-" + this.background + " ";
                }
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>