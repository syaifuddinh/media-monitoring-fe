<template>
    <img 
        :src="type === 'url' ? src : require('~/assets/images/' + this.src)"
        :class="classState"
        :width="width"
        :height="height"
    >
</template>

<script>
    export default {
        name: 'IndexPage',
        props: {
            src: {
                type: String,
                default: ""
            },
            width: {
                type: String,
                default: ""
            },
            height: {
                type: String,
                default: ""
            },
            className: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                classState: "",
                imageSource: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setClassState() {
                let classState = "";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
        }
    }
</script>