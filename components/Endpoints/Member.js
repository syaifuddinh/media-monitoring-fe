import Base from "./Base.js";

const store = async (email, role) => {
    let response = {}; 
    let ajaxResponse;
    const request= { email, role };
    let ajax;
    const organizationId = window.$nuxt.$store.state.Organization.default.id;
    const url = "organization/add-member";
    request.organization_id = organizationId;
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Member berhasil dibuat");
    } catch {

    }

    return response;
}


const list = async () => {
    let response = []; 
    let ajaxResponse;
    const organizationId = window.$nuxt.$store.state.Organization.default.id;
    let ajax;
    const url = "organization/" + organizationId + "/members";
    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse.map(value => {
            const response = value;
            response.name = "-";
            response.roleName = value.role_name;
            response.statusName = value.status_name;

            return response;
        });
    } catch {

    }

    return response;
}

export default {
    store,
    list
};