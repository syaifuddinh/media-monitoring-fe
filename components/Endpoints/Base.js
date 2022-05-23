import User from "@models/User";

const nuxt = () => {
    const user = User.getData();
    if(!user) {
        document.cookie = "cookie=ok;max-age=-1";
    }
    return window.$nuxt;
}

const config = () => {
    return nuxt().$config;
}

const axios = () => {
    const response = nuxt().$api; 
    return response;
}

const second = () => {
    const response = nuxt().$second; 
    return response;
}

export default {
    nuxt,
    config,
    second,
    axios
};