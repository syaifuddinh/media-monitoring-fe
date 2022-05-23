import Base from "@endpoints/Base.js";

const store = async (email, phone) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/contact";
    request.data = [];
    request.data.push({
        parameter: "email",
        value: email
    });
    request.data.push({
        parameter: "phone",
        value: phone
    });
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Contact person berhasil disimpan");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

export default {
    store
};