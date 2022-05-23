import Base from "@endpoints/Base.js";

const setStatus = async (eventId, isActive) => {
    let response = {}; 
    let ajaxResponse;
    const request = { is_active: isActive };
    let ajax;
    const url = "event/" + eventId + "/leaderboard-status";

    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Leaderboard berhasil di-update");
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

const setPoints = async (eventId, data) => {
    let response = {}; 
    let ajaxResponse;
    const request = { data };
    let ajax;
    const url = "event/" + eventId + "/leaderboard-points";

    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Leaderboard berhasil di-update");
    } catch(e) {
        throw new Error(e)
    }

    return response;
}


const setWinnerTotal = async (eventId, total) => {
    let response = {}; 
    let ajaxResponse;
    const request = { total };
    let ajax;
    const url = "event/" + eventId + "/leaderboard-winner";

    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Jumlah pemenang berhasil di-update");
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

const list = async (eventId) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "event/" + eventId + "/leaderboard-points";

    try {
        ajax = await Base.axios().get(url);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data; 
        response = response.map(value => {
            const response = value;
            response.children = response.children.map(child => {
                const response = child;
                response.isActive = child.is_active;

                return response;
            });

            return response;
        })
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    list,
    setPoints,
    setWinnerTotal,
    setStatus
};