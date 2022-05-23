<template>
    <TrialCard>
        Selamat Datang, Muhammad 👋<br>
        Kamu Masih Menggunakan Fitur Trial
    </TrialCard>
</template>

<script>
    import TrialCard from "@elements/Card/Trial/Index";

    export default {
        name: 'IndexPage',
        components: {
           TrialCard 
        },
        data() {
            return {
                classState: ""
            }
        }
    }
</script>