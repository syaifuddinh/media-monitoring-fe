<template>
    <Modal
        @confirm="confirm"
        @close="onClose"
        title=""
        :use-confirm-button="false"
        :height="730"
        :width="73"
        :padding-x="0"
        close-button-class="pr-31px mb-12px"
    >
        <template #trigger>
            <div>
                <slot></slot>
            </div>
        </template>
        <template #main>
            <VideoPlayer
                :src="src"
                :extension="extension"
            />
        </template>
    </Modal>
</template>

<script>
    import Modal from "@elements/Modal/Index";
    import VideoPlayer from "@elements/VideoPlayer/Index";

    export default {
        name: 'IndexPage',
        components: {
            Modal,
            VideoPlayer
        },
        props: {
            className: {
                type: String,
                default: ""
            },
            src: {
                type: String,
                required: true
            },
            extension: {
                type: String,
                required: true
            },
            isDisplay: {
                type: Boolean,
                default: false
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
            onRollback() {
                this.$emit("rollback");
            },
            confirm(closeModal) {
                closeModal();
            }
        }
    }
</script>