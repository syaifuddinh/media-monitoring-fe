<template>
    <div class="py-40px px-24px bg-white position-fixed w-100 h-100 top-0 left-0">
        <div class="row">
            <div class="col-md-6 col-xs-12">
                <div class="d-flex justify-content-center">
                    <Logo />
                </div>
                <LeadParagraphText
                    display="block"
                    class-name="mt-16px"
                >
                    Masuk
                </LeadParagraphText>
                <TextInput
                    className="mt-56px"
                    icon="Message.png"
                    placeholder="Username"
                    v-model="data.username"
                />
                <PasswordInput
                    className="mt-29px"
                    placeholder="Kata sandi"
                    v-model="data.password"
                    @keydown="onPasswordKeydown"
                />
                <NormalText className="mt-32px" display="block">
                    <CheckboxInput v-model="isRemember" />
                    Simpan Kata Sandi
                </NormalText>  
                <Button
                    variant="primary"
                    label="Masuk"
                    className="w-100 mt-48px"
                    :isLoading="isLoading"
                    :disabled="!data.username || !data.password"
                    @click="onSubmitted"
                />
                
            </div>
            <div
                class="position-fixed col-md-6 d-none d-md-block top-0 py-30px"
                style="right:-2%"
            >
                <ImageDisplay
                    src="people-research.png"
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
    import Button from "@elements/Button/Index";
    import Logo from "@elements/Logo/Index";
    import ImageDisplay from "@elements/ImageDisplay/Index";

    export default {
        name: 'IndexPage',
        components: {
            Logo,
            LeadParagraphText,
            TextInput,
            CheckboxInput,
            NormalText,
            Button,
            ImageDisplay,
            PasswordInput
        },
        data() {
            return {
                data: {
                    username: "",
                    password: "",
                },
                isRemember: false,
                isLoading: false
            }
        },
        methods: {
            setCookie() {
                if(this.isRemember === true) {
                    this.$cookies.set(
                        "cookie",
                        "ok",
                        { maxAge: 60 * 60 * 24 * 3 }
                    );
                } else {
                    this.$cookies.set(
                        "cookie",
                        "ok"
                    );
                }
            },
            onPasswordKeydown({ keyCode }) {
                if(keyCode === 13)
                    this.onSubmitted();
            },
            async onSubmitted() {
                this.isLoading = true;
                try {
                    const response = await this.$axios.$post('/login', this.data);
                    const data = response.data;
                    this.$store.commit("User/setUserRole", data.userRole);
                    const input = JSON.stringify(data);
                    localStorage.setItem("authApp", input);
                    this.setCookie();
                    setTimeout(() => {
                        this.$router.push("/")
                    }, 500);
                } catch(e) {
                    this.$toast.error("Username atau password tidak ditemukan");
                }
                this.isLoading = false;
            }
        }
    }
</script>