import Base from "./Base.js";

const list = async () => {
    let response = []; 
    let ajaxResponse;
    const request= {};
    let ajax;
    const url = "countries";
    try {
        ajax = await Base.axios().get(url, request);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse;
    } catch {

    }

    return response;
}

export default {
    list
};