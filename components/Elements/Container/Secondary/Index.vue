<template>
    <span :class="classState">
        <slot></slot>    
    </span>
</template>

<script>
    export default {
        name: 'IndexPage',
        props: ["className", "width", "height", "justify", "align", "background", "direction", "wrap"],
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
                classState += "px-200px ";
                classState += "position-relative ";
                classState += "bg-white ";
                classState += "d-flex ";
                classState += "overflow-hidden ";
                if(this.wrap) {
                    classState += "flex-" + this.wrap + " ";
                } else {
                    classState += "flex-wrap ";
                }
                if(this.direction) {
                    classState += "flex-" + this.direction + " ";
                }
                if(this.width) {
                    classState += "w-" + this.width + "px ";
                } else {
                    classState += "w-100 ";
                }
                if(this.height) {
                    classState += "h-" + this.height + "px ";
                }
                if(this.background) {
                    classState += "bg-" + this.background + " ";
                }
                if(this.align) {
                    classState += "align-items-" + this.align;
                }
                if(this.justify) {
                    classState += "justify-content-" + this.justify;
                }
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>