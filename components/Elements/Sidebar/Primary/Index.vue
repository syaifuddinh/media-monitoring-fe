<template>
    <div :class="defaultClass + ' ' + className">
        <div v-if="false" class="pb-24px">
            <Logo width="125" height="auto" />
        </div>
        <div :key="counter">
            <div v-for="(value, index) in menus" :key="index">
                <PrimaryMenu>{{ value.title }}</PrimaryMenu>
                <template v-if="value.items">
                    <SecondaryMenu
                        v-for="secondValue in value.items"
                        :key="secondValue.title"
                        :icon="secondValue.icon"
                        icon-variant="fontawesome"
                        :url="secondValue.url"
                        :color="secondValue.color ? secondValue.color : ''"
                        @click="onMenuClick"
                    >
                        {{ secondValue.title }}
                    </SecondaryMenu>

                    <LogoutModal v-if="value.key === 'pengaturan'">
                        <SecondaryMenu
                            key="logout"
                            icon="sign-out-alt"
                            color="danger"
                            :is-colored-hover="false"
                        >
                            Keluar
                        </SecondaryMenu>
                    </LogoutModal>

                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import LogoutModal from '@elements/Modal/Logout/Index';
    import Logo from '@elements/Logo/Index';
    import Menus from './Menus';
    import PrimaryMenu from './Menu/Primary';
    import SecondaryMenu from './Menu/Secondary';

    export default {
        name: 'IndexPage',
        components: {
            Logo,
            LogoutModal,
            PrimaryMenu,
            SecondaryMenu
        },
        props: {
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                counter: 0,
                defaultClass: "",
                menus: Menus,
                image: ""
            }
        },
        mounted() {
            this.setDefaultClass();
        },
        methods: {
            onMenuClick() {
                ++this.counter;
            },
            setDefaultClass() {
                let defaultClass = "";
                
                defaultClass += "position-fixed "
                defaultClass += "top-0 left-0 "
                defaultClass += "px-16px "
                defaultClass += "pb-16px "
                defaultClass += "pt-48px "
                defaultClass += "w-25 "
                defaultClass += "h-100 "
                if(this.$store.state.Base.isUseDarkTheme === true) {
                    defaultClass += "bg-light-dark "
                } else if(this.$store.state.Base.isUseDarkTheme === false) {
                    defaultClass += "bg-white "
                }
                this.defaultClass = defaultClass
            }
        }
    }
</script>