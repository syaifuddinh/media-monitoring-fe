<template>
    <div class="d-flex align-items-center position-relative">
        <Dropdown
            :auto-hide-dropdown="false"
            :color="$store.state.Base.isUseDarkTheme ? 'white' : ''"
            @load="onDropdownLoad"
        >
            <LogoutModal @close="onLogoutModalClose">
                <DropdownItem
                    icon="sign-out-alt"
                    color="danger"
                >
                        Keluar
                </DropdownItem>
            </LogoutModal>
        </Dropdown>
    </div>
</template>

<script>
    import DropdownItem from '@elements/Dropdown/Item/Index';
    import Dropdown from '@elements/Dropdown/Index';
    import LogoutModal from '@elements/Modal/Logout/Index';

    export default {
        name: 'IndexPage',
        components: {
            LogoutModal,
            Dropdown,
            DropdownItem
        },
        data() {
            return {
                isShown: false,
                timer: null,
                hideDropdown: () => {}
            }
        },
        methods: {
            onDropdownLoad(closeModal) {
                this.hideDropdown = closeModal;
            },
            redirectToProfile() {
                this.$router.push({path: "/profile"});
                this.hideDropdown();
            },
            redirectToHomePage() {
                this.$router.push({path: "/"});
                this.hideDropdown();
            },
            onLogoutModalClose() {
                this.hideDropdown();
            },
            logout() {
                this.hideDropdown();
            }
        }
    }
</script>