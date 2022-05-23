<template>
    <span :class="classState">
        <slot></slot>    
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
            weight: {
                type: String,
                default: ""
            },
            color: {
                type: String,
                default: "black"
            },
            darkThemeColor: {
                type: String,
                default: "white"
            },
            font: {
                type: String,
                default: ""
            },
            display: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                classState: ""
            }
        },
        mounted() {
            this.setClassState();
        },
        methods: {
            setClassState() {
                let classState = "";
                const isUseDarkTheme = this.$store.state.Base.isUseDarkTheme === true
                classState += "fs-32px ";
                if(isUseDarkTheme === true) {
                    classState += "text-" + this.darkThemeColor + " ";
                } else if(isUseDarkTheme === false){
                    classState += "text-" + this.color + " ";
                }
                if(this.font) {
                    classState += "font-" + this.font + " ";
                }
                if(this.weight) {
                    classState += "font-weight-" + this.weight + " ";
                } else {
                    classState += "font-weight-700 ";
                }
                if(this.display) {
                    classState += "d-" + this.display + " ";
                }
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>