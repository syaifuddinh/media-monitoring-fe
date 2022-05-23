export const state = () => ({
      pageTitle: "",
      isShowApp: false,
      isShowBlackLayer: false,
      isUseDarkTheme: false
})

export const mutations = {
    setPageTitle(state, value) {
        state.pageTitle = value;
    },
    switchApp(state, value) {
        state.isShowApp = value;
    },
    switchDarkTheme(state, value) {
        state.isUseDarkTheme = value;
    },
    switchBlackLayer(state, value) {
        state.isShowBlackLayer = value;
    }
}
