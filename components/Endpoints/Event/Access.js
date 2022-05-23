import Base from "@endpoints/Base.js";

const update = async (eventId, access) => {
    let response = {}; 
    let ajaxResponse;
    const request = { access };
    let ajax;
    const url = "event/" + eventId + "/set-access";

    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Akses berhasil disimpan");
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    update
};