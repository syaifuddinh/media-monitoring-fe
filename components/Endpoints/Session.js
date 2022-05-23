import moment from "moment-timezone";
import Base from "./Base.js";

const store = async (name, date, startTime, endTime, description, speakers) => {
    console.log(speakers);
    let response = {}; 
    let ajaxResponse;
    const request = { name, description, speakers};
    let ajax;
    const eventId = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + eventId + "/add-session";
    request.session_start  = date + " " + startTime;
    request.session_end  = date + " " + endTime;
    if(!description) {
        request.description = "-";
    }
    
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Session berhasil dibuat");
    } catch(e) {
    }

    return response;
}

const update = async (id, name, date, startTime, endTime, description, speakers) => {
    let response = {}; 
    let ajaxResponse;
    const request = { name, description, speakers};
    let ajax;
    const url = "event/session/" + id;
    request.session_start  = date + " " + startTime;
    request.session_end  = date + " " + endTime;
    if(!description) {
        request.description = "-";
    }
    
    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Session berhasil diubah");
    } catch(e) {
    }

    return response;
}


const list = async (eventId, timezone) => {
    let response = []; 
    let ajaxResponse;
    let ajax;
    const url = "event/" + eventId + "/sessions";
    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse.map(value => {
            const response = value;
            response.sessionStart = value.session_start;
            response.sessionEnd = value.session_end;
            response.startTime = moment(value.session_start).tz(timezone).format("HH:mm");
            response.endTime = moment(value.session_end).tz(timezone).format("HH:mm");

            return response;
        })
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

const show = async (id) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "event/session/" + id;
    const timezone = window.$nuxt.$store.state.Event.visited.tz;
    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse;
        response.readableDate = moment(response.session_start).tz(timezone).format("dddd, DD MMMM YYYY");
        response.startTime = moment(response.session_start).tz(timezone).format("HH:mm");
        response.endTime = moment(response.session_end).tz(timezone).format("HH:mm");
        response.speakerData = [];
        response.speakersWithId = [];
        if(response.speakers) {
            response.speakerData = response.speakers.map(value => value.email);
            response.speakersWithId = response.speakers.map(value => value.pivot.event_speaker_id);
        }
    } catch(e) {
        throw new Error(e)
    }

    return response;
}

export default {
    update,
    store,
    show,
    list
};