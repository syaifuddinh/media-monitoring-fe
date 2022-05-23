<template>
    <CircleFrame
        :width="size"
        :height="size"
        class-name="b-1 border-dark-grey"
    />
</template>

<script>
    import CircleFrame from "@elements/CircleFrame/Index";

    export default {
        name: 'IndexPage',
        components: {
            CircleFrame
        },
        props: {
            size: {
                type: Number,
                default: 16
            },
            className: {
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
                
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>