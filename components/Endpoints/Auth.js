import User from "@models/User";
import Base from "./Base.js";

const me = async () => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "auth/me";
    const config = {
        headers: {
            Authorization: "Bearer " + User.getToken()
        }
    }
    response.networks = [];
    try {
        ajax = await Base.axios().get(url, config);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse;
    } catch(e) {
    }

    return response;
}

export default {
    me
};