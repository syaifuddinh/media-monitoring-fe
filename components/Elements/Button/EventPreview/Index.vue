<template>
    <div>
        <Button
            v-if="variant === 'primary'"
            :margin-top="16"
            variant="primary"
            label="Lihat Halaman Event"
            @click="viewEventPreview"
        />

        <Button
            v-if="variant === 'secondary'"
            variant="outline-primary"
            label="preview"
            float="right"
            :width="137"
            :margin-right="16"
            left-icon="eye"
            left-icon-variant="fontawesome"
            @click="viewEventPreview"
        />
    </div>
</template>

<script>
    import Button from "@elements/Button/Index";

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
            viewEventPreview() {
                const eventId = this.$store.state.Event.visited.id;
                const url = this.$config.onairUrl + "/" + eventId + "?is_preview=1"; 
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