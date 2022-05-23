<template>
    <Anchor decoration="none" :to="url">
        <div @click="onClick">
            <SmallText
                display="block"
                :color="labelColor"
                :dark-theme-color="labelColor"
                :weight="500"
                :class-name="'letter-spacing-1 text-capitalize px-13px py-15px ' + ('hover-lighten-text-' + labelColor)"
                :key="labelColor"
                :background="isActived === true ? 'primary' : null"
                :rounded="12"
            >
                <Icon
                    v-if="icon"
                    :variant="iconVariant"
                    :src="icon"
                    class-name="mr-20px d-inline-block"
                    :dark-theme-color="labelColor"
                />
                <slot></slot>
            </SmallText>
        </div>
    </Anchor>
</template>

<script>
    import SmallText from '@elements/Text/Small/Index';
    import Icon from '@elements/Icon/Index';
    import Anchor from '@elements/Anchor/Index';

    export default {
        name: 'IndexPage',
        components: {
            SmallText,
            Anchor,
            Icon
        },
        props: {
            icon: {
                required: true,
                type: String
            },
            iconVariant: {
                type: String,
                default: "fontawesome"
            },
            url: {
                type: String,
                default: ""
            },
            isColoredHover: {
                type: Boolean,
                default: true
            },
            color: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                isActived: false,
                labelColor: "black"
            }
        },
        created() {
            this.setColor();
        },
        methods: {
            onClick() {
                this.$emit("click");
            },
            setColor() {
                setTimeout(() => {
                    let value = "black";
                    const path = window.location.pathname;
                    if(this.isColoredHover === true) {
                        if(path.search(this.url) > -1) {
                            const regex = /.*\/...+/;
                            this.isActived = true;
                            if(this.url === "/" && regex.test(path)) {
                                this.isActived = false;
                            }
                        } else {
                            this.isActived = false;
                        }
                    }
                    if(this.isActived === true) {
                        value = "white";
                    } else if(this.color) {
                        value = this.color;
                    }
                    this.labelColor = value;
                }, 800);
                
            }
        }
    }
</script>