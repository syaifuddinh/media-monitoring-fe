<template>
    <div>
        <CreateBackdropModal @confirm="onSubmit">
            <CreateWidgetCard label="upload backdrop" />
        </CreateBackdropModal>
    </div>
</template>

<script>
    import CreateBackdropModal from "@elements/Modal/CreateBackdrop/Index";
    import CreateWidgetCard from "@elements/Card/CreateWidget/Index";

    export default {
        name: 'IndexPage',
        components: {
            CreateWidgetCard,
            CreateBackdropModal
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
                this.$emit("submit")
            },
            setClassState() {
                let classState = "";

                classState += "h-300px ";
                classState += "flex-column ";

                classState += "d-flex ";
                classState += "align-items-center ";
                classState += "justify-content-center ";
                classState += "b-1 ";
                classState += "border-primary ";
                classState += "border-dashed ";
                classState += "cursor-pointer ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>