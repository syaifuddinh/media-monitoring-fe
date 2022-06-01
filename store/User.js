export const state = () => ({
    userRole: ""
});

export const mutations = {
    setUserRole(state, value) {
        state.userRole = value;
    }
};
