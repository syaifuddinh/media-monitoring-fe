<template>
    <Table>
        <thead>
            <tr>
                <Th align="center">
                    Invoice #
                </Th>
                <Th align="center">
                    Tgl. Invoice
                </Th>
                <Th align="center">
                    Tgl. Akhir
                </Th>
                <Th align="center">
                    Total 
                </Th>
                <Th align="center">
                    Status 
                </Th>
            </tr>
        </thead>
    </Table>
</template>

<script>
    import Table from "@elements/Table/Index";
    import Th from "@elements/Table/Th/Index";

    export default {
        name: 'IndexPage',
        components: {
            Table,
            Th
        },
        props: {
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>