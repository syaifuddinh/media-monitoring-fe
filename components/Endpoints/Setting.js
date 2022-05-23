import Base from "./Base.js";

const store = async (key, value) => {
    let response = {}; 
    let ajaxResponse;
    const request= { key, value};
    let ajax;
    const url = "setting";
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const show = async (keyword) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "setting/keyword";
    try {
        ajax = await Base.axios().get(url);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data; 
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

export default {
    store,
    show
};