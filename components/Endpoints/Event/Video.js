import Base from "@endpoints/Base.js";

const storeExternalVideo = async (name, videoUrl) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/video-link";
    const organizationId = window.$nuxt.$store.state.Event.visited.organization.id;
    const request= { name };
    request.organization_id = organizationId;
    request.external_link = videoUrl;
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Video berhasil dibuat");
    } catch {

    }

    return response;
}

const storeInternalVideo = async (name, fileName, fileSize) => {
    let response = {}; 
    let ajaxResponse;
    const request= {};
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/video-file";
    const organizationId = window.$nuxt.$store.state.Event.visited.organization.id;
    request.organization_id = organizationId;
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

const storeExistingVideo = async (eventId, videoId) => {
    let response = {}; 
    let ajaxResponse;
    const request= { video_id: videoId };
    let ajax;
    const url = "event/" + eventId + "/video-select";
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
    const request= { id, also_delete_library: 0 };
    let ajax;
    const url = "event/video";
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
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/videos";

    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse.map(value => {
            const response = {};            
            const data = value.library;
            response.storageId = value.id;
            response.id = data.id;
            response.title = data.name;
            response.url = data.external_link ? data.external_link : (data.file ? data.file.image_path : "");
            response.type = data.external_link ? "external" : "internal";
            response.extension = data.file ? data.file.extension : "";

            return response;
        })
    } catch {

    }

    return response;
}

export default {
    storeExternalVideo,
    storeInternalVideo,
    storeExistingVideo,
    delete: remove,
    list
};