import Base from "@endpoints/Base.js";

const store = async (eventId, image) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const url = "event/" + eventId + "/stage-backdrop";
    request.append("image", image);

    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Stage backdrop berhasil di-simpan");
    } catch(e) {
        throw new Error(e)
    }

    return response;
}
const switchActived = async (eventId, backdropId, isShowAlert = true) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const url = "event/" + eventId + "/stage-backdrop-set-active";
    request.backdrop_id = backdropId;

    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        if(isShowAlert === true) {
            window.$nuxt.$toast.success("Stage backdrop berhasil di-update");
        }
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

const list = async (eventId) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "event/" + eventId + "/stage-backdrops";

    try {
        ajax = await Base.axios().get(url);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data; 
        response = response.map((value, index) => {
            const response = value;
            response.title = "Backdrop " + (index + 1);
            response.isActive = response.is_active;
            response.imageUrl = "";
            if(response.image) {
                response.imageUrl = response.image.image_path;
            }

            return response;
        })
        
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    list,
    store,
    switchActived
};