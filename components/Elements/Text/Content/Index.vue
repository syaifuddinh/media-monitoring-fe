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
            transform: {
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
            display: {
                type: String,
                default: "inline-block"
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
                classState += "fs-18px ";
                classState += "font-weight-" + this.weight + " ";
                classState += "d-" + this.display + " ";
                classState += "text-" + this.align + " ";
                if(this.transform) {
                    classState += "text-" + this.transform + " ";
                }
                if(this.marginTop) {
                    classState += "mt-" + this.marginTop + "px ";
                }
                if(this.font) {
                    classState += "font-" + this.font + " ";
                }
                if(this.color) {
                    classState += "text-" + this.color + " ";
                } else {
                    classState += "text-black ";
                }
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>