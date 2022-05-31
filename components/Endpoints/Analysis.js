import moment from "moment";
import Base from "./Base.js";

const list = async ({keyword, startDate, endDate, paging}) => {
    let response = {}; 
    let ajaxResponse;
    const params = {keyword, startDate, endDate};
    let ajax;
    const url = "analysis";
    if(paging) {
        params.page = paging.page;
        params.length = paging.length;
    }
    try {
        ajax = await Base.axios().get(url, { params });
        ajaxResponse = ajax.data;
        response = ajaxResponse.data; 
        response.list = response.list.map(value => {
            const response = value;
            response.readableDate = moment(value.date).format("DD MMMM YYYY");

            return response;
        });
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const store = async (date, description) => {
    let response = {}; 
    let ajaxResponse;
    const request = {date, description};
    let ajax;
    const url = "analysis";
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        window.$nuxt.$toast.success("Analisa berhasil disimpan");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const update = async (date, description, id) => {
    let response = {}; 
    let ajaxResponse;
    const request = {date, description};
    let ajax;
    const url = "analysis/" + id;
    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        window.$nuxt.$toast.success("Analisa berhasil di-update");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const show = async (id) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "analysis/" + id;
    try {
        ajax = await Base.axios().get(url);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        response.readableDate = moment(response.date).format("DD MMMM YYYY")
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const destroy = async (id) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "analysis/" + id;
    try {
        ajax = await Base.axios().delete(url);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        window.$nuxt.$toast.success("Analisa berhasil dihapus");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

export default {
    show,
    update,
    destroy,
    store,
    list
};