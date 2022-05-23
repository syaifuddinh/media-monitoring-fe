<template>
    <Anchor 
        decoration="none"
        :to="url"
        @click="onLinkClicked"
    >
        <SmallText 
            :className="'px-15px py-8px ' + className"
            weight="600"
            :color="isActived === false ? color : (activedColor ? activedColor : '')"

        >
            {{ label }}
        </SmallText>
    </Anchor>
</template>

<script>
    import SmallText from '@elements/Text/Small/Index';
    import Anchor from '@elements/Anchor/Index';

    export default {
        name: 'IndexPage',
        props: ["className", "url", "label", "color", "activedColor"],
        components: {
            SmallText,
            Anchor
        },
        data() {
            return {
                isActived: false
            }
        },
        mounted() {
            this.setActivedLink();
        },
        methods: {
            onLinkClicked() {
                this.$emit("click");
            },
            setActivedLink() {
                const path = location.pathname;
                const url = this.url;
                const pathCheck = new RegExp(".*(" + path + ").*")
                if(path === "/") {
                    this.isActived = path === url;
                } else {
                    this.isActived = pathCheck.test(url);
                }
            }
        }
    }
</script>