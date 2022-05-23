const getData = () => {
    let response = null;
    const data = localStorage.getItem("authApp");
    const ticket = document.cookie;
    if(data && ticket) {
        response = JSON.parse(data);
    }
    if(data && !ticket) {
        logout(false);
    }

    return response;
}

const getProfile = () => {
    let response = null;
    const data = getData();
    if(data) {
        response = data.user;
    }

    return response;
}

const getToken = () => {
    let response = null;
    const data = getData();
    if(data) {
        response = data.token;
    }

    return response;
}

const logout = (isRedirectToLogin = true) => {
    if(window) {
        if(window.$nuxt) {
            localStorage.removeItem("authApp");
            document.cookie = "cookie=ok;max-age=-1";
            if(isRedirectToLogin === true) {
                window.$nuxt.$router.push("/auth/login");
            }
        }
    }
}

const isAuthed = () => {
    let response = false;
    const data = getData();
    if(data) response = true;
    return response;
}

export default {
    isAuthed,
    getData,
    getProfile,
    getToken,
    logout
};