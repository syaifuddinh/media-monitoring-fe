import Base from "./Base.js";

const list = async () => {
    let response = []; 
    let ajaxResponse;
    let ajax;
    const url = "event-networks";
    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data.data; 
        response = ajaxResponse;
    } catch(e) {
    }

    return response;
}

const store = async (params) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const url = "event-networks/user-submit";
    request.event_network_id = params;
    try {
        ajax = await Base.api().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

export default {
    list,
    store
};