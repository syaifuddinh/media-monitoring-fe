import Base from "@endpoints/Base.js";

const store = async (emails, role) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/attendees";
    request.emails = emails;
    request.type = role;
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Peserta berhasil ditambahkan");
    } catch(e) {
    }

    return response;
}

const list = async () => {
    let response = []; 
    let ajaxResponse;
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/attendees";
    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data.data; 
        response = ajaxResponse.map(value => {
            const response = {};            
            response.id = value.id;
            response.type = value.type;
            response.name = "";
            response.email = value.email;
            response.invitationStatus = "Telah Terkirim";
            response.roleName = "";
            switch(value.type) {
                case 1:
                    response.roleName = "Host";
                    break;
                case 2:
                    response.roleName = "Speaker";
                    break;
                case 3:
                    response.roleName = "Sponsor";
                    break;
                case 4:
                    response.roleName = "Peserta";
                    break;
            }

            response.registrationStatus = "Belum Terdaftar";
            response.registrationStatusVariant = "danger";

            if(response.is_confirmed === true) {
                response.registrationStatus = "Terdaftar";
                response.registrationStatusVariant = "primary";
            }


            return response;
        })
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    list,
    store
};