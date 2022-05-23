<template>
    <span :class="classState" @click="onClick">
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
                default: "grey"
            },
            overflow: {
                type: String,
                default: "hidden"
            },
            marginTop: {
                type: Number,
                default: 0
            },
            marginRight: {
                type: Number,
                default: 0
            },
            width: {
                type: Number,
                default: 0
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
            height: {
                type: Number,
                default: 0
            },
            radius: {
                type: Number,
                default: 16
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
                classState += "bg-" + this.background + " ";
                if(this.height) {
                    classState += "h-" + this.height + "px ";
                }
                if(this.marginTop) {
                    classState += "mt-" + this.marginTop + "px ";
                }
                if(this.marginRight) {
                    classState += "mr-" + this.marginRight + "px ";
                }
                if(this.width) {
                    if(this.width > 0) {
                        classState += "w-" + this.width + "px ";
                    }
                } else {
                    classState += "w-100 ";
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
                classState += "d-inline-block ";
                classState += "overflow-" + this.overflow + " ";
                classState += "position-relative ";
                classState += "rounded-" + this.radius + "px ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
            onClick() {
                this.$emit("click");
            }
        }
    }
</script>