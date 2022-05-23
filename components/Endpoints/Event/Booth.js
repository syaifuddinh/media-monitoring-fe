import Base from "@endpoints/Base.js";

const store = async (
    name,
    tags,
    email,
    isChatActive,
    isTableActive,
    tableCount,
    isStream,
    image
) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/booth";
    request.append("name", name);
    request.append("email", email);
    request.append("description", "-");
    request.append("tags", tags.join(","));
    request.append("is_chat_active", isChatActive ? 1 : 0);
    request.append("is_table_active", isTableActive ? 1 : 0);
    request.append("table_count", tableCount);
    request.append("is_stream", isStream ? 1 : 0);
    request.append("image", image);
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Booth berhasil ditambahkan");
    } catch(e) {
    }

    return response;
}

const update = async (
    id,
    name,
    tags,
    email,
    isChatActive,
    isTableActive,
    tableCount,
    isStream,
    image = null
) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const url = "event/booth/" + id;
    request.name = name;
    request.description = "-";
    request.tags = tags.join(",");
    request.email = email;
    request.is_chat_active = isChatActive;
    request.is_table_active = isTableActive;
    request.table_count = tableCount;
    request.is_stream = isStream;
    
    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Booth berhasil ditambahkan");
    } catch(e) {
    }

    return response;
}

const list = async () => {
    let response = []; 
    let ajaxResponse;
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/booths";
    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse.map((value, index) => {
            const response = {};            
            let remainingTagQty = value.tags.length - 3;
            remainingTagQty = remainingTagQty < 0 ? 0 : remainingTagQty;
            response.id = value.id;
            response.order = index + 1;
            response.name = value.name;
            response.owner = value.email;
            response.email = value.email;
            response.tags = value.tags.slice(0, 3).join(", ");
            response.remainingTagQty = remainingTagQty;

            return response;
        })
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

const remove = async (id) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const request = {};
    const url = "event/booth";
    request.booth_id = [id];
    try {
        ajax = await Base.axios().delete(url, {params: request});
        ajax = ajax.data;
        ajaxResponse = ajax; 
        response = ajaxResponse
        window.$nuxt.$toast.success("Booth berhasil dihapus");
    } catch(e) {
    }

    return response;
}


const show = async (id) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "event/booth/" + id;
    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse;
        response.tableCount = response.table_count;
        response.isChatActive = response.is_chat_active;
        response.isTableActive = response.is_table_active;
        response.isStream = response.is_stream;
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    delete: remove,
    update,
    show,
    list,
    store
};