<template>
    <Dropdown
        icon="ellipsis-h"
        :color="$store.state.Base.isUseDarkTheme === true ? 'dark-grey' : ''"
        :width="170"
        @load="onDropdownLoad"
    >
        <DropdownItem @click="unarchive">
            Pulihkan
        </DropdownItem>
    </Dropdown>    
</template>

<script>
    import Dropdown from "@elements/Dropdown/Index";
    import DropdownItem from "@elements/Dropdown/Item/Index";
    import Event from "@endpoints/Event";

    export default {
        name: 'IndexPage',
        components: {
            Dropdown,
            DropdownItem
        },
        props: {
            eventId: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                hideDropdown: () => {}
            }
        },
        methods: {
            onDropdownLoad(closeModal) {
                this.hideDropdown = closeModal;
            },
            async unarchive() {
                await Event.unarchive(this.eventId);
                this.hideDropdown();
                this.$emit("unarchive");
            }
        }
    }
</script>