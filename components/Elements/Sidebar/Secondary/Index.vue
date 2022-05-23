<template>
    <div :class="defaultClass + ' ' + className">
        <div class="pb-24px">
            <Logo width="125" height="auto" />
        </div>
        <Badge />
        <div :key="counter">
            <div v-for="(value, index) in menus" :key="index">
                <PrimaryMenu>{{ value.title }}</PrimaryMenu>
                <template v-if="value.items">
                    <div
                        v-for="secondValue in value.items"
                        :key="secondValue.title"
                    >
                        <SecondaryMenu
                            v-if="secondValue.isShown === true"
                            :icon="secondValue.icon"
                            icon-variant="image"
                            :url="secondValue.url"
                            :color="secondValue.color ? secondValue.color : ''"
                            @click="onMenuClick"
                        >
                            {{ secondValue.title }}
                        </SecondaryMenu>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from '@elements/Logo/Index';
    import Menus from './Menus';
    import PrimaryMenu from './Menu/Primary';
    import SecondaryMenu from './Menu/Secondary';
    import Badge from './Badge/Index';

    export default {
        name: 'IndexPage',
        components: {
            Logo,
            Badge,
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
                menus: [],
                image: ""
            }
        },
        mounted() {
            this.setDefaultClass();
            this.setMenu();
        },
        methods: {
            onMenuClick() {
                ++this.counter;
            },
            setMenu() {
                let menus = Menus;
                const type = this.$store.state.Event.visited.eventTypeSlug;
                menus = menus.map(primaryValue => {
                    const items = primaryValue.items.map(secondaryValue => {
                        const response = secondaryValue;
                        response.isShown = false;
                        if(secondaryValue.shown === "*") {
                            response.isShown = true;
                        } else if(typeof secondaryValue.shown === "string" && secondaryValue.shown.search(type) > -1) {
                            response.isShown = true;
                        }

                        return response;
                    });
                    const response = primaryValue;
                    response.items = items;

                    return response;
                });

                this.menus = menus;
            },
            setDefaultClass() {
                let defaultClass = "";
                
                defaultClass += "p-16px "
                defaultClass += "w-100 "
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