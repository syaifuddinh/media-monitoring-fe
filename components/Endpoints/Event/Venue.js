import Base from "@endpoints/Base.js";

const setDefault = async (eventId, isDefaultVenue) => {
    let response = {}; 
    let ajaxResponse;
    const request = { is_default_venue: isDefaultVenue};
    let ajax;
    const url = "event/" + eventId + "/default-venue";

    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    setDefault
};