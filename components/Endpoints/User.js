import Base from "./Base.js";

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


const showDetail = async (id) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "user/" + id;
    try {
        ajax = await Base.axios().get(url);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        response.userRole = response.user_role;
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const list = async ({keyword, paging}) => {
    let response = {}; 
    let ajaxResponse;
    const params = {keyword};
    let ajax;
    const url = "user";
    params.page = paging.page;
    params.length = paging.length;
    try {
        ajax = await Base.axios().get(url, { params });
        ajaxResponse = ajax.data;
        response = ajaxResponse.data; 
        response.list = response.list.map(value => {
            const response = value;

            return response;
        });
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const store = async ({ name, username, userRole, password, confirmPassword }) => {
    let response = {}; 
    let ajaxResponse;
    const request = {name, username, userRole, password, confirmPassword};
    let ajax;
    const url = "user";
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        window.$nuxt.$toast.success("User berhasil disimpan");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const update = async ({ name, username, userRole, password, confirmPassword }, id) => {
    let response = {}; 
    let ajaxResponse;
    const request = {name, username, userRole, password, confirmPassword};
    let ajax;
    const url = "user/" + id;
    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        window.$nuxt.$toast.success("User berhasil di-update");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const destroy = async (id) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "user/" + id;
    try {
        ajax = await Base.axios().delete(url);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        window.$nuxt.$toast.success("User berhasil dihapus");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

export default {
    showDetail,
    destroy,
    list,
    store,
    update,
    uploadPhoto,
    show
};