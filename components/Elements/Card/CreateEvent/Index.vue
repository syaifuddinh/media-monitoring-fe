<template>
    <CreateEventModal>
        <CreateWidgetCard label="buat event baru" />
    </CreateEventModal>
</template>

<script>
    import CreateWidgetCard from "@elements/Card/CreateWidget/Index";
    import CreateEventModal from "@elements/Modal/CreateEvent/Index";

    export default {
        name: 'IndexPage',
        components: {
            CreateWidgetCard,
            CreateEventModal
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
            }
        }
    }
</script>