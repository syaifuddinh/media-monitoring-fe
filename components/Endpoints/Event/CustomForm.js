import Base from "@endpoints/Base.js";

const store = async (data) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/custom-form";
    const params = data;
    params.is_required = params.isRequired;
    params.parameter = params.parameter ? params.parameter : "-";
    request.data = [params];
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const remove = async (id, data) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/custom-form";
    request.deleted = [ id ];
    request.data = data;
    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const update = async (data) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/custom-form";
    request.deleted = [];
    request.data = data;
    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const list = async () => {
    let response = []; 
    let ajaxResponse;
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/custom-form";
    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse.map(value => {
            const response = {};            
            response.id = value.id;
            response.parameter = value.parameter;
            response.orders = value.orders;
            response.isRequired = value.is_required;

            return response;
        })
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    delete: remove,
    update,
    list,
    store
};