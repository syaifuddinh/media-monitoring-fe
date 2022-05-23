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
            weight: {
                type: String,
                default: ""
            },
            color: {
                type: String,
                default: ""
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
                classState += "fs-24px ";
                if(this.display) {
                    classState += "d-" + this.display + " ";
                }
                if(this.weight) {
                    classState += "font-weight-" + this.weight + " ";
                } else {
                    classState += "font-weight-600 ";
                }
                if(this.color) {
                    classState += "text-" + this.color + " ";
                } else {
                    classState += "text-secondary-black ";
                }
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>