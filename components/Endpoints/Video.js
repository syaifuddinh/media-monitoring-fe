import Base from "./Base.js";

const storeExternalVideo = async (name, videoUrl) => {
    let response = {}; 
    let ajaxResponse;
    const request= {};
    let ajax;
    const organizationId = window.$nuxt.$store.state.Organization.default.id;
    const url = "organization/" + organizationId + "/video-link";
    request.name = name;
    request.external_link = videoUrl;
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Video berhasil dibuat");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const storeInternalVideo = async (name, fileName, fileSize) => {
    let response = {}; 
    let ajaxResponse;
    const request= {};
    let ajax;
    const organizationId = window.$nuxt.$store.state.Organization.default.id;
    const url = "organization/" + organizationId + "/video";
    request.name = name;
    request.file_name = fileName;
    request.file_size = fileSize;
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Video berhasil dibuat");
    } catch {

    }

    return response;
}

const remove = async (id) => {
    let response = {}; 
    let ajaxResponse;
    const request= { id };
    let ajax;
    const url = "organization/video";
    console.log(request)
    try {
        ajax = await Base.axios().delete(url, {params: request});
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Video berhasil dihapus");
    } catch {

    }

    return response;
}

const list = async () => {
    let response = []; 
    let ajaxResponse;
    const params = {};
    const organizationId = window.$nuxt.$store.state.Organization.default.id;
    let ajax;
    const url = "videos";
    params.organization_id = organizationId;
    try {
        ajax = await Base.axios().get(url, { params });
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse.map(value => {
            const response = {};            
            response.id = value.id;
            response.title = value.name;
            response.url = value.external_link ? value.external_link : (value.file ? value.file.image_path : "");
            response.type = value.external_link ? "external" : "internal";
            response.extension = value.file ? value.file.extension : "";

            return response;
        })
    } catch {

    }

    return response;
}

export default {
    storeExternalVideo,
    storeInternalVideo,
    delete: remove,
    list
};