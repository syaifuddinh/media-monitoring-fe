import Base from "@endpoints/Base.js";

const store = async (name, categoryId, sponsorUrl, image) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/availability";
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

const update = async (availability, removed) => {
    let response = {}; 
    let ajaxResponse;
    const request = { availability, remove_availability: removed };
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/set-availability";
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Ketersediaan berhasil diupdate");
    } catch(e) {
    }

    return response;
}

const list = async () => {
    let response = []; 
    let ajaxResponse;
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/availability";
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
    const url = "event/availability";
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