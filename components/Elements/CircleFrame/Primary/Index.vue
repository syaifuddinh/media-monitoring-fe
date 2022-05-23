<template>
    <CircleFrame
        :width="16"
        :height="16"
        class-name="b-1 border-primary d-flex justify-content-center align-items-center"
    >
        <CircleFrame
            :width="8"
            :height="8"
            background="primary"
        />            
    </CircleFrame>
</template>

<script>
    import CircleFrame from "@elements/CircleFrame/Index";

    export default {
        name: 'IndexPage',
        components: {
            CircleFrame
        },
        props: {
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