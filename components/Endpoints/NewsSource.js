import Base from "./Base.js";

const list = async () => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "news-source";
    try {
        ajax = await Base.axios().get(url);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data; 
        response = response.list;
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

export default {
    list
};