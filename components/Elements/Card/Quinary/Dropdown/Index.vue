<template>
    <Dropdown
        icon="ellipsis-h"
        :color="$store.state.Base.isUseDarkTheme === true ? 'dark-grey' : ''"
    >
        <DropdownItem>
            Kirim Undangan
        </DropdownItem>
        <DropdownItem color="danger">
            Hapus
        </DropdownItem>
    </Dropdown>    
</template>

<script>
    import Dropdown from "@elements/Dropdown/Index";
    import DropdownItem from "@elements/Dropdown/Item/Index";

    export default {
        name: 'IndexPage',
        components: {
            Dropdown,
            DropdownItem
        }
    }
</script>