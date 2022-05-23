<template>
    <PrimaryCard
        :class="classState"
        :padding-y="8"
    >
        <SemiLeadContentText
            display="block"
            :weight="700"
        >
            Bulog Jangan Banyak Wacana, Mulyanto: Segera Bekerja Turunkan Harga Migor Curah
        </SemiLeadContentText>
        <NormalText
            display="block"
            :weight="500"
            :margin-top="8"
        >
            Wakil Ketua Fraksi PKS DPR RI Mulyanto mendesak Bulog untuk tidak banyak berwacana dan obral janji terkait upaya normalisasi harga minyak goreng (migor) curah.
        </NormalText>
        <LineRuler class-name="mt-16px" />
    </PrimaryCard>
</template>

<script>
    import PrimaryCard from "@elements/Card/Primary/Index";
    import SemiLeadContentText from "@elements/Text/SemiLeadContent/Index";
    import NormalText from "@elements/Text/Normal/Index";
    import LineRuler from "@elements/LineRuler/Index";

    export default {
        name: 'IndexPage',
        components: {
            SemiLeadContentText,
            NormalText,
            LineRuler,
            PrimaryCard
        },
        props: {
        },
        data() {
            return {
                classState: ""
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>