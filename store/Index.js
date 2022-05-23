export const state = () => ({
    counter: 0,
    navbarRightsideCounter: 0,
    pageCounter: 0
})

export const mutations = {
    pageIncrement(state) {
        state.pageCounter++
    },
    navbarRightsideIncrement(state) {
        state.navbarRightsideCounter++
    },
    increment(state) {
        state.counter++
    }
}
