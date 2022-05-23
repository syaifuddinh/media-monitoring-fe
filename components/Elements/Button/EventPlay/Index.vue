<template>
    <Button
        variant="primary"
        label="Masuk ke Event"
        float="right"
        :width="197"
        :margin-right="16"
        left-icon="video"
        left-icon-variant="fontawesome"
        @click="viewEventPreview"
    />
</template>

<script>
    import Button from "@elements/Button/Index";
    import Event from "@endpoints/Event";

    export default {
        name: 'IndexPage',
        components: {
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
            async viewEventPreview() {
                const eventId = this.$store.state.Event.visited.id;
                const data = await Event.start(eventId);
                const url = this.$config.onairUrl + "/" + eventId + "?token=" + data.token; 
                window.open(url, "_blank");
            },
            setClassName() {
                let classState = " ";
                classState += this.className;
                this.classState = classState;
            }
        }
    }
</script>