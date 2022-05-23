import Base from "@endpoints/Base.js";

const store = async (data) => {
    let response = {}; 
    let ajaxResponse;
    const request = { data };
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/sponsor-tier";
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Kategori sponsor berhasil ditambahkan");
    } catch(e) {
    }

    return response;
}

const update = async (data, deleted) => {
    let response = {}; 
    let ajaxResponse;
    const request = { data, deleted };
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/sponsor-tier";
    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Kategori sponsor berhasil disimpan");
    } catch(e) {
    }

    return response;
}

const list = async () => {
    let response = []; 
    let ajaxResponse;
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/sponsor-tier";
    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    list,
    update,
    store
};