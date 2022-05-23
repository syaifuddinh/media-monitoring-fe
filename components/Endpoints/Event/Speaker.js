import Base from "@endpoints/Base.js";
import Attendee from "@endpoints/Event/Attendee.js";

const store = async (eventId, image, email, name, organizationName, city, countryId, description, type) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const url = "event/" + eventId + "/speaker";
    request.append("email", email);
    request.append("image", image);
    request.append("name", name);
    request.append("organization_name", organizationName);
    request.append("city", city);
    request.append("type", type);
    request.append("description", description);
    request.append("country_id", countryId);
    try {
        ajax = await Base.second().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Speaker berhasil ditambahkan");
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const list = async () => {
    let response = []; 
    try {
        response = await Attendee.list();
        response = response.filter(value => value.type === 2 || value.type === 1);
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    list,
    store
};