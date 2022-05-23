<template>
    
    <div :class="classState" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'IndexPage',
        props: {
            className: {
                type: String,
                default: ""
            },
            isDisableDarkTheme: {
                type: Boolean,
                default: false
            },
            background: {
                type: String,
                default: "white"
            },
            radius: {
                type: Number,
                default: 24
            },
            height: {
                type: Number,
                default: 0
            },
            paddingX: {
                type: Number,
                default: 24
            },
            marginTop: {
                type: Number,
                default: 0
            },
            paddingY: {
                type: Number,
                default: 24
            },
            darkThemeBackground: {
                type: String,
                default: "light-dark"
            }
        },
        data() {
            return {
                classState: "",
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            onClick() {
                this.$emit("click");
            },
            setClassState() {
                let classState = "";
                const background = this.background;
                const isUseDarkTheme = this.$store.state.Base.isUseDarkTheme === true && this.isDisableDarkTheme === false;
                if(isUseDarkTheme) {
                    classState += "bg-" + this.darkThemeBackground + " ";
                } else {
                    classState += "bg-" + background + " ";
                }

                if(this.height) {
                    classState += "h-" + this.height + "px ";
                }

                classState += "mt-" + this.marginTop + "px ";
                classState += "px-" + this.paddingX + "px ";
                classState += "py-" + this.paddingY + "px ";
                classState += "rounded-" + this.radius + "px ";
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>