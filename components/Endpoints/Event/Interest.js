import Base from "@endpoints/Base.js";

const store = async (eventId, data) => {
    let response = {}; 
    let ajaxResponse;
    const request = { data };
    let ajax;
    const url = "event/" + eventId + "/interest";

    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Minat berhasil di-update");
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

const list = async (eventId) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "event/" + eventId + "/interests";

    try {
        ajax = await Base.axios().get(url);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data; 
        
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    list,
    store
};