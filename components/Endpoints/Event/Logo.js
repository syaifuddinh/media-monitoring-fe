import Base from "@endpoints/Base.js";

const update = async (eventId, image) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const url = "event/" + eventId + "/change-logo?_method=PUT";
    request.append("image", image);

    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Logo berhasil disimpan");
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    update
};