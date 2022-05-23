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
            background: {
                type: String,
                default: ""
            },
            color: {
                type: String,
                default: "white"
            },
            marginRight: {
                type: Number,
                default: 0
            },
            marginLeft: {
                type: Number,
                default: 0
            },
            display: {
                type: String,
                default: "inline-block"
            },
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: true
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
                classState += "d-flex ";
                classState += "justify-content-center ";
                classState += "text-" + this.color + " ";
                classState += "h-" + this.height + "px ";
                classState += "w-" + this.width + "px ";
                classState += "rounded-100px ";
                classState += "overflow-hidden ";
                if(this.marginRight) {
                    classState += "mr-" + this.marginRight + "px ";
                }
                if(this.marginLeft) {
                    classState += "ml-" + this.marginRight + "px ";
                }
                if(this.background) {
                    classState += "bg-" + this.background + " ";
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