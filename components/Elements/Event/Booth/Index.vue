<template>
    <div>
        <Table :is-empty="items.length === 0">
            <thead>
                <tr>
                    <Th>
                    </Th>
                    <Th>
                        Urutan
                    </Th>
                    <Th>
                        nama booth
                    </Th>
                    <Th>
                        pemilik
                    </Th>
                    <Th>
                        tag
                    </Th>
                    <Th>
                        aksi
                    </Th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="value in items"
                    :key="value.id"
                >
                    <Td>
                        <div class="cursor-pointer">
                            <Icon
                                variant="fontawesome"
                                src="bars"
                            />
                        </div>
                    </Td>
                    <Td>
                        {{ value.order }}
                    </Td>
                    <Td>
                        {{ value.name }}
                    </Td>
                    <Td>
                        {{ value.owner }}
                    </Td>
                    <Td>
                        {{ value.tags }} 
                        <SmallText
                            v-if="value.remainingTagQty > 0"
                            color="primary"
                            dark-theme-color="primary"
                            :weight="500"
                        >
                            +{{ value.remainingTagQty }} lainnya
                        </SmallText>
                    </Td>
                    <Td>
                        <div class="d-flex">
                            <Button
                                variant="link-primary"
                                left-icon="link"
                                left-icon-variant="fontawesome"
                            />
                            <Button
                                variant="link-dark-grey"
                                left-icon="edit"
                                left-icon-variant="fontawesome"
                                @click="edit(value.id)"
                            />
                            <DeleteButton
                                @confirm="remove(value.id)"
                            />
                        </div>
                    </Td>
                </tr>
            </tbody>
        </Table>
    </div>
</template>

<script>
    import Button from "@elements/Button/Index";
    import Icon from "@elements/Icon/Index";
    import Table from "@elements/Table/Index";
    import Th from "@elements/Table/Th/Index";
    import Td from "@elements/Table/Td/Index";
    import SmallText from "@elements/Text/Small/Index";
    import DeleteButton from "@elements/Button/Delete/Index";
    import Booth from "@endpoints/Event/Booth";

    export default {
        name: 'IndexPage',
        components: {
            DeleteButton,
            Button,
            SmallText,
            Icon,
            Table,
            Td,
            Th
        },
        props: {
        },
        data() {
            return {
                items: []
            }
        },
        mounted() {
            this.setItems();
        },
        methods: {
            async remove(id) {
                await Booth.delete(id);
                this.$emit("reload");
            },
            edit(id) {
                this.$emit("edit", id);
            },
            async setItems() {
                const items = await Booth.list();
                this.items = items;
            }
        }
    }
</script>