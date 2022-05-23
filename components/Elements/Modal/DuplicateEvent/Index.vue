<template>
    <Modal
        @confirm="confirm"
        @close="onClose"
        title="Duplikat Event"
        cancel-button-variant="dark-grey"
        confirm-button-variant="primary"
        confirm-button-label="Duplikat"
        :use-confirm-button="true"
        :height="300"
    >
        <template #trigger>
            <slot></slot>
        </template>
        <template #main>
            <div>
                <SmallText
                    :weight="700"
                    display="block"
                    :margin-top="16"
                >
                    Nama Event
                </SmallText>
                <TextInput
                    class-name="mt-16px"
                />
            </div>
        </template>
    </Modal>
</template>

<script>
    import SmallText from "@elements/Text/Small/Index";
    import Modal from "@elements/Modal/Index";
    import TextInput from "@elements/Input/Text/Index";

    export default {
        name: 'IndexPage',
        components: {
            Modal,
            TextInput,
            SmallText
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
                closeModal();
            }
        }
    }
</script>