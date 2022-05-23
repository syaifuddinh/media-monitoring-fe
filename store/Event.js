export const state = () => ({
      visited: {},
})

export const mutations = {
    changeVisited(state, value) {
        state.visited = value;
    }
}
