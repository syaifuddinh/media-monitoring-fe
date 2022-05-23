<template>
    <EmailSent
        title="Email Terkirim"
        subtitle="Silahkan cek emailmu untuk<br> atur ulang kata sandi"
    />
</template>

<script>
    import EmailSent from "@elements/EmailSent/Index";

    export default {
        layout (context) {
            return 'SecondaryLayout';
        },
        components: {
            EmailSent
        }
    }
</script>