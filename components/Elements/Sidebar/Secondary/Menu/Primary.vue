<template>
    <ExtraSmallText
        display="block"
        color="light-black"
        weight="600"
        class-name="letter-spacing-3 text-uppercase mt-16px mb-8px"
    >
        <slot></slot>
    </ExtraSmallText>
</template>

<script>
    import ExtraSmallText from '@elements/Text/ExtraSmall/Index';

    export default {
        name: 'IndexPage',
        components: {
            ExtraSmallText
        }
    }
</script>