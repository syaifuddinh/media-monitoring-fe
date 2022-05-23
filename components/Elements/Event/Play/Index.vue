<template>
    <div :class="'py-16px px-60px d-flex justify-content-end bt-1 border-dark-grey position-absolute top-minus-78 left-0 w-100 ' + ($store.state.Base.isUseDarkTheme ? 'bg-light-dark' : 'bg-white')">
        <EventPreviewButton
            variant="secondary"
        />
        <EventPlayButton
            v-if="statusSlug === 'ongoing'"
        />
        <EventStartButton
            v-if="statusSlug === 'scheduled'"
            @confirm="startEvent"
        />
        
    </div>
</template>

<script>
    import EventPreviewButton from "@elements/Button/EventPreview/Index";
    import EventStartButton from "@elements/Button/EventStart/Index";
    import EventPlayButton from "@elements/Button/EventPlay/Index";
    import Event from "@endpoints/Event";

    export default {
        name: 'IndexPage',
        components: {
            EventStartButton,
            EventPlayButton,
            EventPreviewButton
        },
        props: {
        },
        data() {
            return {
            }
        },
        computed: {
            statusSlug() {
                return this.$store.state.Event.visited.statusSlug;
            }
        },
        mounted() {
        },
        methods: {
            async startEvent() {
                const eventId = this.$store.state.Event.visited.id;
                const data = await Event.start(eventId);
                const url = this.$config.onairUrl + "/" + eventId + "?token=" + data.token; 
                Event.show(this.$store.state.Event.visited.id);
                window.open(url, "_blank");
            }
        }
    }
</script>