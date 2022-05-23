import Base from "@endpoints/Base.js";

const store = async (name) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/organizer";
    request.name = name;
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Event organizer berhasil disimpan");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

export default {
    store
};