<template>
    <div class="d-flex">
        <Button
            label="Detail"
            variant="link-primary"
            :width="80"
        />
        <Button
            label="Upgrade"
            variant="primary"
            :width="97"
            :margin-left="10"
        />
    </div>   
</template>

<script>
    import Button from "@elements/Button/Index";

    export default {
        name: 'IndexPage',
        components: {
            Button
        }
    }
</script>