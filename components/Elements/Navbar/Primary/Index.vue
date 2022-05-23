<template>
    <div
        id="primaryNavbar"
        :class="defaultClass + ' ' + className"
    >
        <div class="position-absolute d-block d-md-none top-20-percent left-5-percent">
            <div
                class="py-5px px-8px b-1 border-dark-grey rounded-8px"
                @click="showSidebar"
            >
                <Icon
                    variant="fontawesome"
                    src="bars"
                    dark-theme-color="dark-grey"
                />
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-end w-100">
            <RightSide
                :key="counter"
            />
        </div>
    </div>
</template>

<script>
    import Icon from '@elements/Icon/Index';
    import RightSide from './RightSide/Index';

    export default {
        name: 'IndexPage',
        components: {
            Icon,
            RightSide
        },
        props: {
            className: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                defaultClass: "",
                temporarySidebar: null,
                menuItems: []
            }
        },
        computed: {
            counter() {
                return this.$store.state.Index.navbarRightsideCounter
            }
        },
        mounted() {
            this.setDefaultClass();
        },
        methods: {
            initiateCloseSidebarEvent() {
                const onClose = (e) => {
                    const sidebar = e.target.closest("aside");
                    console.log(sidebar);
                    if(!sidebar) {
                        if(this.temporarySidebar) {
                            this.temporarySidebar.remove();
                            this.temporarySidebar = null;
                        }
                        window.removeEventListener("click", onClose);
                    }

                }
                window.addEventListener("click", onClose);
            },
            setDefaultClass() {
                let defaultClass = "";
                defaultClass += "py-16px pl-32px "
                defaultClass += "pr-60px "
                defaultClass += "d-flex "
                defaultClass += "w-100 "
                defaultClass += "position-fixed top-0 left-0 "
                defaultClass += "justify-content-end "
                defaultClass += "align-items-center "
                defaultClass += "position-relative "
                defaultClass += "bb-1 ";
                if(this.$store.state.Base.isUseDarkTheme === true) {
                    defaultClass += "bg-light-dark "
                    defaultClass += "border-light-dark ";
                } else if(this.$store.state.Base.isUseDarkTheme === false) {
                    defaultClass += "bg-white "
                    defaultClass += "border-secondary-grey ";
                }
                this.defaultClass = defaultClass
            },
            showSidebar() {
                const mainContainer = document.getElementById("main-container");
                const sidebar = document.getElementById("sidebar");
                let newSidebar = null;
                if(sidebar) {
                    newSidebar = sidebar.cloneNode(true);
                    newSidebar.classList.remove("d-none");
                    newSidebar.classList.add("position-fixed");
                    newSidebar.classList.add("z-index-100");
                    newSidebar.classList.add("left-minus-3-percent");
                    newSidebar.classList.add("top-0-percent");
                    newSidebar.classList.add("left-0-percent");
                    newSidebar.classList.add("d-md-none");
                    newSidebar.classList.add("w-80");
                    this.temporarySidebar = newSidebar;
                    mainContainer.prepend(newSidebar);
                    setTimeout(() => {
                        this.initiateCloseSidebarEvent();
                    }, 500);
                }
            },
            onNavigationClicked() {
                window.history.back();
            }
        }
    }
</script>