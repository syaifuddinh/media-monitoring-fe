import Base from "../Base.js";

const update = async (id, sentiment) => {
    let response = {}; 
    const request = {sentiment}; 
    let ajaxResponse;
    let ajax;
    const url = "news/" + id + "/sentiment";
    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        window.$nuxt.$toast.success("Sentimen berhasil di-update");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

export default {
    update
};