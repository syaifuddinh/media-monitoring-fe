import Base from "./Base.js";

const update = async (name, countryId, timezone, interests) => {
    let response = {}; 
    let ajaxResponse;
    const request= { name };
    let ajax;
    const url = "profile";
    request.country_id = countryId;
    request.tz = timezone;
    request.event_network_id = interests;
    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Profil berhasil disimpan");
    } catch {

    }

    return response;
}
const uploadPhoto = async (file) => {
    let response = {}; 
    let ajaxResponse;
    const request= new FormData();
    let ajax;
    const url = "auth/me/upload-image";
    request.append("image", file);
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Foto berhasil disimpan");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const show = async () => {
    let response = {}; 
    let ajaxResponse;
    const request= {};
    let ajax;
    const url = "auth/me";
    try {
        ajax = await Base.axios().get(url, request);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse;
        response.timezone = response.tz ? response.tz : "Asia/Jakarta";
        response.countryId = response.country ? response.country.id : null;
        response.imageUrl = "";
        if(response.images) {
            if(response.images.image_path) {
                response.imageUrl = response.images.image_path;
            }
        }
        response.interests = [];
        if(response.networks.length > 0) {
            response.interests = response.networks.map(({ id }) => id);
        }
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    update,
    uploadPhoto,
    show
};