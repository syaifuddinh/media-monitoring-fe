<template>
    <CreateOrganizationModal @confirm="onConfirm">
        <CreateWidgetCard
            label="buat organisasi"
            variant="secondary"
        />
    </CreateOrganizationModal>
</template>

<script>
    import CreateWidgetCard from "@elements/Card/CreateWidget/Index";
    import CreateOrganizationModal from "@elements/Modal/CreateOrganization/Index";

    export default {
        name: 'IndexPage',
        components: {
            CreateOrganizationModal,
            CreateWidgetCard
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
            onConfirm() {
                this.$emit("confirm");
            }
        }
    }
</script>