<template>
    <span :class="classState">
        <ConfirmModal
            @confirm="onButtonClicked"
        >
            <Button
                variant="primary"
                label="Mulai Event"
                float="right"
                :width="147"
                left-icon="video"
                left-icon-variant="fontawesome"
                @click="startEvent"
            /> 
        </ConfirmModal>
    </span>
</template>

<script>
    import Button from "@elements/Button/Index";
    import ConfirmModal from "@elements/Modal/Confirm/Index";

    export default {
        name: 'IndexPage',
        components: {
            ConfirmModal,
            Button
        },
        props: {
            variant: {
                type: String,
                default: "primary"
            },
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                classState: "",
                iconColor: "",
                containerClass: ""
            }
        },
        updated() {
            this.setClassName();
        },
        mounted() {
            this.setClassName();
        },
        methods: {
            onButtonClicked() {
                this.$emit("confirm");
            },
            setClassName() {
                let classState = " ";
                classState += this.className;
                this.classState = classState;
            }
        }
    }
</script>