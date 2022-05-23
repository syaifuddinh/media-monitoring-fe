import Base from "./Base.js";

const store = async (email) => {
    let response = {}; 
    let ajaxResponse;
    const request= { email };
    let ajax;
    const url = "subscribe";
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Email berhasil disubmit");
    } catch {

    }

    return response;
}

export default {
    store
};