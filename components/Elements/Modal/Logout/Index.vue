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
                <ImageDisplay 
                    src="sad-face.png"
                    width="96"
                    height="auto"
                />
                <SemiLeadContentText
                    :margin-top="8"
                    :weight="700"
                    align="center"
                    display="block"
                >
                    Apakah anda ingin keluar?
                </SemiLeadContentText>        
            </div>
        </template>
    </Modal>
</template>

<script>
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import Modal from "@elements/Modal/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import User from "@models/User";

    export default {
        name: 'IndexPage',
        components: {
            Modal,
            ImageDisplay,
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
                User.logout();
                closeModal();
            }
        }
    }
</script>