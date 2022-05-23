import Base from "./Base.js";

const store = async (name) => {
    let response = {}; 
    let ajaxResponse;
    const request= {};
    let ajax;
    const url = "organization";
    request.name = name;
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
    } catch {

    }

    return response;
}

const list = async () => {
    let response = []; 
    let ajaxResponse;
    const request= {};
    let ajax;
    const url = "organization";
    try {
        ajax = await Base.axios().get(url, request);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse.map(value => {
            const response = {};
            let slugEdited = "";
            response.id = value.id;
            response.name = value.name;
            response.slugEdited = value.slug;
            if(response.slugEdited) {
                const chips = value.slug.split("-");
                slugEdited = value.name[0];
                if(chips.length > 2) {
                    slugEdited = chips[0][0] + chips[1][0];
                } else if(chips[0].length > 1) {
                    slugEdited = chips[0][0] + chips[0][1];
                }
            }
            response.slugEdited = slugEdited;
            response.slug = slugEdited;

            return response;
        })

        let defaultOrganization = window.localStorage.getItem('defaultOrganization');
        if(defaultOrganization) {
            defaultOrganization = JSON.parse(defaultOrganization);
            window.$nuxt.$store.commit("Organization/changeDefault", defaultOrganization);
        } else if(response.length > 0) {
            window.$nuxt.$store.commit("Organization/changeDefault", response[0]);
        }
    } catch {

    }

    return response;
}

export default {
    store,
    list
};