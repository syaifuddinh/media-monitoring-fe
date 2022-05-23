<template>
    <span :class="classState">
        <DeleteModal
            @confirm="onButtonClicked"
        >
            <Button
                v-if="variant === 'primary'"
                variant="link-danger"
                left-icon="trash"
                left-icon-variant="fontawesome"
            />

            <SmallText 
                v-if="variant === 'secondary'"
                weight="500"
                color="danger"
                dark-theme-color="danger"
                display="block"
            >
                Hapus
            </SmallText> 
        </DeleteModal>
    </span>
</template>

<script>
    import Button from "@elements/Button/Index";
    import DeleteModal from "@elements/Modal/Delete/Index";
    import SmallText from "@elements/Text/Small/Index";

    export default {
        name: 'IndexPage',
        components: {
            SmallText,
            DeleteModal,
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