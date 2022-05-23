export const state = () => ({
      default: {},
})

export const mutations = {
    changeDefault(state, value) {
        window.localStorage.setItem("defaultOrganization", JSON.stringify(value));
        state.default = value;
    }
}
