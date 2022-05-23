<template>
    <div
        @click="onClick"
        class="d-flex justify-content-between align-items-center cursor-pointer"
    >
        <div class="d-flex align-items-center">
            <SemiLeadContentText
                display="inline-flex"
                :background="$store.state.Base.isUseDarkTheme === true ? 'dark-grey' : 'bright-grey'"
                :radius="8"
                :weight="600"
                transform="uppercase"
                color="light-black"
                class-name="w-40px h-40px justify-content-center align-items-center"
            >
                {{ alias }}
            </SemiLeadContentText>
            <SmallText
                display="block"
                transform="capitalize"
                color="light-black"
                :weight="600"
                :margin-left="8"
            >
                {{ name }}
            </SmallText>
        </div>
        <Icon
            v-if="isShowChevronRight === true"
            src="chevron-right"
            variant="fontawesome"
            color="light-grey"
            dark-theme-color="light-grey"
            class-name="float-right"
        />
    </div>
</template>

<script>
    import SemiLeadContentText from '@elements/Text/SemiLeadContent/Index';
    import SmallText from '@elements/Text/Small/Index';
    import Icon from '@elements/Icon/Index';

    export default {
        name: 'IndexPage',
        components: {
            Icon,
            SemiLeadContentText,
            SmallText
        },
        props: {
            name: {
                type: String,
                required: true
            },
            alias: {
                type: String,
                required: true
            },
            isShowChevronRight: {
                type: Boolean,
                default: false
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
                classState += "bg-" + this.background + " ";
                if(this.height) {
                    classState += "h-" + this.height + "px ";
                }
                if(this.marginTop) {
                    classState += "mt-" + this.marginTop + "px ";
                }
                if(this.width) {
                    classState += "w-" + this.width + "px ";
                }
                if(this.padding) {
                    classState += "p-" + this.padding + "px ";
                }
                classState += "d-inline-block ";
                classState += "overflow-hidden ";
                if(this.radius) {
                    classState += "rounded-" + this.radius + "px ";
                } else {
                    classState += "rounded-16px ";
                }
                if(this.className) {
                    classState += this.className;
                }
                this.classState = classState;
            },
            onClick() {
                this.$emit("click");
            }
        }
    }
</script>