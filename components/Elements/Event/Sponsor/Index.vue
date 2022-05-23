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
                        nama
                    </Th>
                    <Th>
                        url
                    </Th>
                    <Th>
                        aksi
                    </Th>
                </tr>
            </thead>

            <tbody>
                <template v-for="primaryValue in items">
                    <tr :key="primaryValue.id">
                        <Td
                            :weight="600"
                            :colspan="5"
                            background="light-dark"
                        >
                            Kategori : {{ primaryValue.name }}
                        </Td>
                    </tr>
                    <tr :key="'noData' + primaryValue.id" v-if="primaryValue.sponsors.length === 0">
                        <Td
                            :colspan="5"
                            justify-content="center"
                        >
                            Belum ada sponsor
                        </Td>
                    </tr>
                    <tr
                        v-for="(secondaryValue, index) in primaryValue.sponsors"
                        :key="'children' + primaryValue.id + secondaryValue.id"
                    >
                        <Td>
                            <Icon
                                variant="fontawesome"
                                src="bars"
                                class-name="hover-text-dark-grey"
                            />
                        </Td>
                        <Td>
                            {{ index + 1 }}
                        </Td>
                        <Td>
                            {{ secondaryValue.name }}
                        </Td>
                        <Td>
                            {{ secondaryValue.url }}
                        </Td>
                        <Td>
                            <div class="d-flex">
                                <Button
                                    variant="link-dark-grey"
                                    left-icon="edit"
                                    left-icon-variant="fontawesome"
                                    @click="edit(primaryValue.id, secondaryValue.id)"
                                />
                                <DeleteButton
                                    @confirm="remove(secondaryValue.id)"
                                />
                            </div>
                        </Td>
                    </tr>
                </template>
            </tbody>
        </Table>
    </div>
</template>

<script>
    import Button from "@elements/Button/Index";
    import DeleteButton from "@elements/Button/Delete/Index";
    import Icon from "@elements/Icon/Index";
    import Table from "@elements/Table/Index";
    import Th from "@elements/Table/Th/Index";
    import Td from "@elements/Table/Td/Index";
    import Sponsor from "@endpoints/Event/Sponsor";

    export default {
        name: 'IndexPage',
        components: {
            DeleteButton,
            Button,
            Table,
            Icon,
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
            this.setData();
        },
        methods: {
            async remove(id) {
                await Sponsor.delete(id);
                this.setData();
                this.$emit("reload");
            },
            edit(categoryId, sponsorId) {
                const primary = this.items.find(value => value.id === categoryId);
                let secondary = null;
                if(primary) {
                    if(primary.sponsors) {
                        secondary = primary.sponsors.find(value => value.id === sponsorId);
                        if(secondary) {
                            const id = sponsorId;
                            const url = secondary.url;
                            const name = secondary.name;
                            const image = secondary.image.image_path;
                            this.$emit("edit", { id, name, categoryId, url, image});
                        }
                    }
                }
            },
            async setData() {
                const items = await Sponsor.list();
                this.items = items;
            }
        }
    }
</script>