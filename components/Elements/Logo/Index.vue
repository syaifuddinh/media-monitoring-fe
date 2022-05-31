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
                src = "logo.png"
                this.src = src;
            }
        }
    }
</script>