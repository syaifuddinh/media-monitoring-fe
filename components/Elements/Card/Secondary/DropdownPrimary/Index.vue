<template>
    <Dropdown
        icon="ellipsis-h"
        :color="$store.state.Base.isUseDarkTheme === true ? 'dark-grey' : ''"
        :auto-hide-dropdown="false"
        @load="onDropdownLoad"
    >
        <SharingLinkModal
            :event-id="eventId"
            @close="onModalClose"
        >
            <DropdownItem>
                Bagikan
            </DropdownItem>
        </SharingLinkModal>
        
        <DuplicateEventModal @close="onModalClose">
            <DropdownItem>
                Duplikat
            </DropdownItem>
        </DuplicateEventModal>
        <DropdownItem @click="archive">
            Arsipkan
        </DropdownItem>
    </Dropdown>    
</template>

<script>
    import SharingLinkModal from "@elements/Modal/SharingLink/Index";
    import DuplicateEventModal from "@elements/Modal/DuplicateEvent/Index";
    import Dropdown from "@elements/Dropdown/Index";
    import DropdownItem from "@elements/Dropdown/Item/Index";
    import Event from "@endpoints/Event";

    export default {
        name: 'IndexPage',
        components: {
            SharingLinkModal,
            DuplicateEventModal,
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
            async archive() {
                await Event.archive(this.eventId);
                this.hideDropdown();
                this.$emit("archive");
            },
            onDropdownLoad(closeModal) {
                this.hideDropdown = closeModal;
            },
            onModalClose() {
                this.hideDropdown();
            }
        }
    }
</script>