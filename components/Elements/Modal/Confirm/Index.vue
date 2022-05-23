<template>
    <Modal
        @confirm="confirm"
        @close="onClose"
        :height="332"
    >
        <template #trigger>
            <slot></slot>
        </template>
        <template #main>
            <div class="d-flex flex-column align-items-center">
                <SemiLeadContentText
                    :margin-top="8"
                    :weight="700"
                    align="center"
                    display="block"
                >
                    Apakah Anda Yakin ?
                </SemiLeadContentText>        
            </div>
        </template>
    </Modal>
</template>

<script>
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import Modal from "@elements/Modal/Index";

    export default {
        name: 'IndexPage',
        components: {
            Modal,
            SemiLeadContentText
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
            },
            onClose() {
                this.$emit("close");
            },
            confirm(closeModal) {
                this.$emit("confirm");
                closeModal();
            }
        }
    }
</script>