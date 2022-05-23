<template>
    <div v-if="$store.state.Base.isShowApp">
        <PrimaryNavbar />
        <PrimarySidebar />
        <div class="pt-60px">
            <div class="d-flex">
                <div class="w-22"></div>
                <div class="pr-24px pl-72px py-24px w-78">
                    <SectionText
                        display="block"
                        class-name="mb-16px"
                    >
                        {{ $store.state.Base.pageTitle }}
                    </SectionText>
                    <Nuxt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PrimaryNavbar from "@elements/Navbar/Primary/Index";
    import PrimarySidebar from "@elements/Sidebar/Primary/Index";
    import SectionText from "@elements/Text/Section/Index";

    export default {
        components: {
            PrimaryNavbar,
            SectionText,
            PrimarySidebar
        },
        mounted() {
        },
        methods: {
        }
    }
</script>