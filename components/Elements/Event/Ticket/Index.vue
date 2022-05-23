<template>
    <div>
        <Table :is-empty="items.length === 0">
            <tr>
                <Th>
                    <CheckboxInput />
                </Th>
                <Th>
                    invoice
                </Th>
                <Th>
                    tanggal
                </Th>
                <Th>
                    email
                </Th>
                <Th>
                    paket
                </Th>
                <Th>
                    durasi
                </Th>
                <Th>
                    jumlah sesi
                </Th>
            </tr>
        </Table>
    </div>
</template>

<script>
    import CheckboxInput from "@elements/Input/Checkbox/Index";
    import Table from "@elements/Table/Index";
    import Th from "@elements/Table/Th/Index";

    export default {
        name: 'IndexPage',
        components: {
            Table,
            Th,
            CheckboxInput
        },
        props: {
        },
        data() {
            return {
                items: []
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>