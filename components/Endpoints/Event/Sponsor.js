import Base from "@endpoints/Base.js";

const store = async (name, categoryId, sponsorUrl, image) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/sponsor";
    request.append("name", name);
    request.append("url", sponsorUrl);
    request.append("image", image);
    request.append("tier_id", categoryId);
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Sponsor berhasil ditambahkan");
    } catch(e) {
    }

    return response;
}

const update = async (id, name, categoryId, sponsorUrl, image) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const url = "event/" + id + "/sponsor?_method=PUT";
    request.append("name", name);
    request.append("url", sponsorUrl);
    if(image) {
        request.append("image", image);
    }
    request.append("tier_id", categoryId);
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Sponsor berhasil diupdate");
    } catch(e) {
    }

    return response;
}

const list = async () => {
    let response = []; 
    let ajaxResponse;
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/sponsor";
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

const remove = async (id) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const request = {};
    const url = "event/sponsor";
    request.id = id;
    try {
        ajax = await Base.axios().delete(url, {params: request});
        ajax = ajax.data;
        ajaxResponse = ajax; 
        response = ajaxResponse;
        window.$nuxt.$toast.success("Sponsor berhasil dihapus");
    } catch(e) {
    }

    return response;
}

export default {
    delete: remove,
    list,
    update,
    store
};