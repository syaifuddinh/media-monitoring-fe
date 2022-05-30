<template>
    <Create
        v-if="id"
        :id="id"
        :name-value="name"
        :username-value="username"
        :user-role-value="userRole"
    />
</template>

<script>

import User from "@endpoints/User";
import Create from "../Create/Index"

export default {
    name: 'IndexPage',
    components: {
        Create
    },
    layout: 'PrimaryLayout',
    data() {
        return {
            id: "",
            name: "",
            username: "",
            userRole: ""
        }
    },
    mounted() {
        this.$store.commit("Base/setPageTitle", "");
        this.setData();
    },
    methods: {
        async setData() {
            try {
                const id = this.$route.params.id;
                const { name, username, userRole } = await User.showDetail(id);
                this.id = id;
                this.name = name;
                this.username = username;
                this.userRole = userRole;
            } catch(e) {
                throw new Error(e);
            }
        }
    }
}
</script>
