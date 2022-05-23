<template>
    <span :class="classState">
        <img 
            v-if="!variant || variant === 'image'"
            :src="require('~/assets/icons/' + src)"
            :class="classState"
            :width="width"
            :height="height"
        >
        <span
            v-if="variant === 'fontawesome'"
            :class="secondaryClassState"
        >
            <i :class="iconSrc"></i>
        </span>
    </span>
</template>

<script>
    export default {
        name: 'IndexPage',
        props: {
            className: {
                type: String,
                default: ""
            },
            src: {
                type: String,
                default: ""
            },
            width: {
                type: String,
                default: ""
            },
            height: {
                type: String,
                default: ""
            },
            size: {
                type: String,
                default: ""
            },
            background: {
                type: String,
                default: ""
            },
            color: {
                type: String,
                default: ""
            },
            frameVariant: {
                type: String,
                default: ""
            },
            variant: {
                type: String,
                default: ""
            },
            darkThemeColor: {
                type: String,
                default: "white"
            }
        },
        data() {
            return {
                classState: "",
                iconSrc: "",
                secondaryClassState: ""
            }
        },
        mounted() {
            this.setClassState();
            this.setIconPackClassName();
            this.setIcon();
        },
        methods: {
            setIcon() {
                let iconSrc = "fa";
            const brands = ["facebook", "facebook-f", "instagram", "youtube", "twitter", "whatsapp", "windows"];
                const isBrand = brands.filter(param => param === this.src).length > 0;
                if(isBrand === true) {
                    iconSrc = "fab";
                }

                iconSrc += " fa-" + this.src;
                this.iconSrc = iconSrc;
            },
            setIconPackClassName() {
                let secondaryClassState = "";
                const frameVariant = this.frameVariant;
                const isUseDarkTheme = this.$store.state.Base.isUseDarkTheme === true;
                if(isUseDarkTheme === true) {
                    secondaryClassState += "text-" + this.darkThemeColor + " " ;
                } else if(isUseDarkTheme === false) {
                    if(this.color) {
                        secondaryClassState += "text-" + this.color + " ";
                    }
                }
                secondaryClassState += "d-inline-block d-inline-flex align-items-center justify-content-center ";
                if(this.size) {
                    secondaryClassState += "fs-" + this.size + "px ";
                }
                if(this.background) {
                    secondaryClassState += "bg-" + this.background + " ";
                }
                switch(frameVariant) {
                    case "primary":
                        secondaryClassState += "w-40px h-40px rounded-8px "
                        break;
                }
                this.secondaryClassState = secondaryClassState;
            },
            setClassState() {
                let classState = "";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>