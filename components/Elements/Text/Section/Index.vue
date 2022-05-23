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
            isDisableDarkTheme: {
                type: Boolean,
                default: false
            },
            weight: {
                type: String,
                default: ""
            },
            color: {
                type: String,
                default: ""
            },
            darkThemeColor: {
                type: String,
                default: "white"
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
                classState += "fs-40px ";
                const isUseDarkTheme = this.$store.state.Base.isUseDarkTheme === true && this.isDisableDarkTheme === false;
                if(this.display) {
                    classState += "d-" + this.display + " ";
                }
                if(this.weight) {
                    classState += "font-weight-" + this.weight + " ";
                } else {
                    classState += "font-weight-700 ";
                }

                if(isUseDarkTheme === true) {
                    classState += "text-" + this.darkThemeColor + " " ;
                } else if(isUseDarkTheme === false){
                    if(this.color) {
                        classState += "text-" + this.color + " ";
                    } else {
                        classState += "text-secondary-black ";
                    }
                }
                
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            }
        }
    }
</script>