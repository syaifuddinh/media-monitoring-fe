<template>
    <ImageDisplay 
        :src="src"
        :width="width ? width : 95"
        :height="height ? height : 'auto'"
    />
</template>

<script>
    import ImageDisplay from '@elements/ImageDisplay/Index';

    export default {
        name: 'IndexPage',
        components: {
            ImageDisplay
        },
        props: {
            variant: {
                type: String,
                default: "primary"
            }, 
            isUseDarkTheme: {
                type: Boolean,
                default: true
            }, 
            height: {
                type: String,
                default: "auto"
            }, 
            width: {
                type: String,
                default: "auto"
            }
        },
        data() {
            return {
                src: "logo.png"
            }
        },
        mounted() {
            this.setLogo();
        },
        methods: {
            setLogo() {
                let src = "";
                if(!this.variant || this.variant === "primary") {
                    if(this.$store.state.Base.isUseDarkTheme === true && this.isUseDarkTheme === true) {
                        src = "logo-white-beta.svg"
                    } else if(this.$store.state.Base.isUseDarkTheme === false || this.isUseDarkTheme === false) {
                        src = "logo-primary-beta.svg"
                    }
                } else if(this.variant === "secondary") {
                    src = "logo-white-beta.svg"

                }
                this.src = src;
            }
        }
    }
</script>