<template>
    <span :class="classState">
        <CircleFrame
            class-name="b-1 border-primary d-flex align-items-center justify-content-center"
            background="primary"
            :width="26"
            :height="26"
        >
            <Icon
                variant="fontawesome"
                src="check"
                dark-theme-color="black"
                :size="12"
                class-name="pb-2px"
            />                    
        </CircleFrame>
    </span>
</template>

<script>
    import CircleFrame from "@elements/CircleFrame/Index";
    import Icon from "@elements/Icon/Index";

    export default {
        name: 'IndexPage',
        components: {
            CircleFrame,
            Icon
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
                classState += this.className;
                this.classState = classState;
            }
        }
    }
</script>