import User from "@endpoints/User";

export default async function ({ app, $config, $cookies, store, route, $router }) {
    const cookies = app.$cookies;
    const response = true;
    let isAuthed = false;
    store.commit("Base/switchApp", false);
    const path = route.path;
    if(cookies.get("cookie")) {
        isAuthed = true;
    }
    if(path.search("login") === -1) {
        if(!isAuthed) {
            app.router.push("/auth/login");
        } else {
            try {
                const { userRole } = await User.show();
                store.commit("User/setUserRole", userRole);
            } catch {
            }
        }
    } else if(path.search("login") > -1){
        if(isAuthed === true)
            app.router.push("/");
    }
    store.commit("Base/switchApp", isAuthed);

    return response;
}
