<template>
    <PrimaryContainer
        direction="column"
        align="center"
    >
        <div class="w-100 h-60px d-none d-md-block"></div>
        <div class="w-100 h-20px d-block d-md-none"></div>
        <ImageDisplay
            src="paper-plane.png"
            width="150"
            height="auto"
        />
        <LeadParagraphText class-name="mt-98px text-center" display="block">
            {{ title }}
        </LeadParagraphText>
        <LeadContentText
            class-name="mt-12px text-center"
            display="block"
            color="dark-grey"
        >
            {{ subtitle }}
        </LeadContentText>
        <div class="w-100 h-90px d-none d-md-block"></div>
        <div class="w-100 h-30px d-block d-md-none"></div>
        <Button
            label="Kirim Lagi"
            variant="outline-primary"
            width="132"
        />
    </PrimaryContainer>
</template>

<script>
    import PrimaryContainer from "@elements/Container/Primary/Index";
    import LeadParagraphText from "@elements/Text/LeadParagraph/Index";
    import LeadContentText from "@elements/Text/Content/Index";
    import Button from "@elements/Button/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";

    export default {
        name: 'IndexPage',
        components: {
            PrimaryContainer,
            Button,
            LeadContentText,
            ImageDisplay,
            LeadParagraphText
        },
        props: {
            title: {
                type: String,
                default: ""
            },
            subtitle: {
                type: String,
                default: ""
            }
        },
    }
</script>