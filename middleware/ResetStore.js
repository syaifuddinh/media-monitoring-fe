export default function ({ app, store }) {
    const response = true;
    const path = window.location.pathname;
    store.commit("Base/changePageTitle", "");
    store.commit("Base/changePageSubtitle", "");
    store.commit("Base/switchGlobalSearching", false);
    store.commit("Base/switchBlackLayer", false);
    
    if(path.search("event/show") > -1) {
        store.commit("Base/switchPrimarySidebar", false);
        store.commit("Base/switchSecondarySidebar", true);
    } else {
        store.commit("Base/switchPrimarySidebar", true);
        store.commit("Base/switchSecondarySidebar", false);
    }

    return response;
}
