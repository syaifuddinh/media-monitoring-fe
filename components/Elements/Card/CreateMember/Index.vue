<template>
    <CreateMemberModal @submit="onSubmit">
        <CreateWidgetCard label="tambah member" />
    </CreateMemberModal>
</template>

<script>
    import CreateWidgetCard from "@elements/Card/CreateWidget/Index";
    import CreateMemberModal from "@elements/Modal/CreateMember/Index";

    export default {
        name: 'IndexPage',
        components: {
            CreateWidgetCard,
            CreateMemberModal
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
            onSubmit() {
                this.$emit("submit");
            },
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