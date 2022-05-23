<template>
    <span :class="'d-inline-block w-' + width + 'px'">
        <img 
            v-if="!type || type === 'static'"
            :src="require('~/assets/images/' + this.src)"
            :class="classState"
            :width="width"
            :height="height"
        >
        <img 
            v-if="type === 'url'"
            :src="src"
            :class="classState"
            :width="width"
            :height="height"
        >
    </span>
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