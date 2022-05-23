<template>
    <div class="pt-40px">
        <div class="row">
            <div class="col-md-6 col-xs-12">
                <LeadParagraphText>
                    Lupa Kata Sandi
                </LeadParagraphText>
                <TextInput
                    className="mt-56px"
                    icon="Message.png"
                    placeholder="Email"
                    v-model="data.email"
                />
                <Button
                    variant="primary"
                    label="Reset Kata Sandi"
                    className="w-100 mt-48px"
                    @click="onSubmitted"
                    :disabled="data.email == false"
                />
            </div>
            <div
                class="position-fixed col-md-6 d-none d-md-block top-0 py-30px"
                style="right:-2%"
            >
                <ImageDisplay
                    src="people-take-money.png"
                    height="auto"
                    className="w-100"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import LeadParagraphText from "@elements/Text/LeadParagraph/Index"
    import TextInput from "@elements/Input/Text/Index"
    import PasswordInput from "@elements/Input/Password/Index"
    import CheckboxInput from "@elements/Input/Checkbox/Index"
    import NormalText from "@elements/Text/Normal/Index";
    import Anchor from "@elements/Anchor/Index";
    import Button from "@elements/Button/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";
    import Icon from "@elements/Icon/Index";
    import LineRuler from "@elements/LineRuler/Index";

    export default {
        layout (context) {
            return 'SecondaryLayout';
        },
        data() {
            return {
                data: {
                    email: ""
                }
            }
        },
        components: {
            LeadParagraphText,
            TextInput,
            CheckboxInput,
            NormalText,
            Anchor,
            Button,
            LineRuler,
            ImageDisplay,
            Icon,
            PasswordInput
        },
        methods: {
            onSubmitted() {
                this.$router.push({path: '/auth/forgot-password/success'});
            }
        }
    }
</script>