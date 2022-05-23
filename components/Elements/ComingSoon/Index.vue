<template>
    <div>
        <Navbar />
        <div class="d-flex flex-column justify-content-center align-items-center">
            <ImageDisplay
                src="loudspeaker.png"
                height="250"
                width="auto"
            />
            <LeadSectionText
                color="black"
                dark-theme-color="black"
                display="block"
                :margin-top="32"
            >
                Coming Soon
            </LeadSectionText>
            <LeadContentText
                color="dark-grey"
                dark-theme-color="dark-grey"
                display="block"
                align="center"
                :margin-top="32"
                :weight="400"
                :padding-x="16"
            >
                Kami masih mempersiapkan yang terbaik untuk Anda
            </LeadContentText>
            <div class="mt-32px d-flex justify-content-center">
                <TextInput
                    placeholder="Masukkan Email"
                    v-model="email"
                    dark-theme-color="black"
                />
                <Button
                    label="Ingatkan Saya"
                    variant="primary"
                    :width="148"
                    :margin-left="8"
                    :is-loading="isLoading"
                    @click="onSubmit"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import LeadSectionText from "@elements/Text/LeadSection/Index";
    import LeadContentText from "@elements/Text/LeadContent/Index";
    import Navbar from "@elements/Navbar/Secondary/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import Button from "@elements/Button/Index";
    import TextInput from "@elements/Input/Text/Index";
    import Subscribe from "@endpoints/Subscribe";
 
    export default {
        name: 'IndexPage',
        components: {
            TextInput,
            Navbar,
            Button,
            ImageDisplay,
            LeadSectionText,
            LeadContentText
        },
        data() {
            return {
                isLoading: false,
                email: ""
            }
        },
        mounted() {
        },
        methods: {
            async onSubmit() {
                this.isLoading = true;
                await Subscribe.store(this.email);
                this.isLoading = false;
            }
        }
    }
</script>