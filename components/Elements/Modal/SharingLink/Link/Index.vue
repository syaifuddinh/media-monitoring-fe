<template>
    <CircleFrame
        :width="49"
        :height="49"
        background="dark"
        class-name="d-flex justify-content-center align-items-center"
        :margin-right="16"
    >
        <Icon
            :src="iconSrc"
            width="35"
            height="auto"
        />
    </CircleFrame>
</template>

<script>
    import Icon from "@elements/Icon/Index";
    import CircleFrame from "@elements/CircleFrame/Index";

    export default {
        name: 'IndexPage',
        components: {
            Icon,
            CircleFrame
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            iconSrc: {
                type: String,
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
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
            confirm(closeModal) {
                closeModal();
            }
        }
    }
</script>