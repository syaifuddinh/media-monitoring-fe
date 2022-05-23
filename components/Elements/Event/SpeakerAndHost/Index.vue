<template>
    <div>
        <div class="d-flex align-items-center justify-content-between mb-26px">
            <div class="d-flex align-items-center">
                <ExtraSmallText
                    dark-theme-color="dark-grey"
                    :weight="700"
                    :margin-right="16"
                >
                    Tampilkan :
                </ExtraSmallText>

                <div>
                    <Chip
                        :items="roles"
                    />
                </div>
            </div>
            <div class="d-flex">
                <CreateSpeakerModal
                    @confirm="setItems"
                >
                    <Button
                        variant="primary"
                        label="Tambah Speaker/Host"
                        :width="240"
                        left-icon="plus-circle"
                        left-icon-variant="fontawesome"
                    />
                </CreateSpeakerModal>
            </div>
        </div>

        <Table :is-empty="items.length === 0">
            <thead>
                <tr>
                    <Th>
                        <CheckboxInput />
                    </Th>
                    <Th>
                        Nama
                    </Th>
                    <Th>
                        email
                    </Th>
                    <Th>
                        role
                    </Th>
                    <Th>
                        undangan
                    </Th>
                    <Th>
                        jumlah pendaftaran
                    </Th>
                    <Th>
                    </Th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="value in items"
                    :key="value.id"
                >
                    <Td>
                        <CheckboxInput />
                    </Td>
                    <Td>
                        {{ value.name }}
                    </Td>
                    <Td>
                        {{ value.email }}
                    </Td>
                    <Td>
                        {{ value.roleName }}
                    </Td>
                    <Td
                        :is-show-circle-indicator="true"
                    >
                        {{ value.invitationStatus }}
                    </Td>
                    <Td
                        :color="value.registrationStatusVariant"
                        :dark-theme-color="value.registrationStatusVariant"
                    >
                        {{ value.registrationStatus }}
                    </Td>
                    <Td>
                        <Button
                            label="Salin Link"
                            variant="link-dark-grey"
                            left-icon="link"
                            left-icon-variant="fontawesome"
                        />
                    </Td>
                </tr>
            </tbody>
        </Table>
    </div>
</template>

<script>
    import Button from "@elements/Button/Index";
    import Chip from "@elements/Chip/Primary/Index";
    import ExtraSmallText from "@elements/Text/ExtraSmall/Index";
    import CheckboxInput from "@elements/Input/Checkbox/Index";
    import Table from "@elements/Table/Index";
    import CreateSpeakerModal from "@elements/Modal/CreateSpeaker/Index";
    import Th from "@elements/Table/Th/Index";
    import Td from "@elements/Table/Td/Index";
    import Speaker from "@endpoints/Event/Speaker";

    export default {
        name: 'IndexPage',
        components: {
            CreateSpeakerModal,
            Table,
            Th,
            Td,
            CheckboxInput,
            ExtraSmallText,
            Chip,
            Button
        },
        props: {
        },
        data() {
            return {
                items: [],
                roles: [
                    {
                        label: "Semua"
                    },
                    {
                        label: "Speaker"
                    },
                    {
                        label: "Host"
                    }
                ]
            }
        },
        mounted() {
            this.setItems();
        },
        methods: {
            async setItems() {
                const items = await Speaker.list();
                this.items = items;
            }
        }
    }
</script>