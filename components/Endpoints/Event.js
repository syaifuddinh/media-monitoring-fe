import moment from "moment-timezone";
import Timezone from "@models/Data/Timezone.json";
import Base from "./Base.js";

const storeMeetingSchedule = async (name, description, date, startTime, endTime, timezone, meetingType, thumbnail, ticketFee) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const url = "event";
    let descriptionField = description;
    if(!descriptionField) {
        descriptionField = "-";
    }
    request.append("type", 1);
    request.append("organization_id", window.$nuxt.$store.state.Organization.default.id);
    request.append("name", name);
    request.append("description", descriptionField);
    request.append("tz", timezone);
    request.append("is_ticket_fee", meetingType);
    request.append("ticket_fee", ticketFee);
    request.append("datetime_start", date + " " + startTime);
    request.append("datetime_end", date + " " + endTime);
    if(thumbnail) {
        request.append("image", thumbnail);
    }
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Jadwal meeting berhasil dibuat");
    } catch(e) {
    }

    return response;
}
const storeConference = async (name, description, startDate, endDate, startTime, endTime, timezone, meetingType, thumbnail, ticketFee) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const url = "event";
    let descriptionField = description;
    if(!descriptionField) {
        descriptionField = "-";
    }
    request.append("type", 4);
    request.append("organization_id", window.$nuxt.$store.state.Organization.default.id);
    request.append("name", name);
    request.append("description", descriptionField);
    request.append("tz", timezone);
    request.append("is_ticket_fee", meetingType);
    request.append("ticket_fee", ticketFee);
    request.append("datetime_start", startDate + " " + startTime);
    request.append("datetime_end", endDate + " " + endTime);
    if(thumbnail) {
        request.append("image", thumbnail);
    }
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Conference berhasil dibuat");
    } catch(e) {
    }

    return response;
}

const storeMeetingBook = async (name, description, timezone, meetingType, thumbnail, ticketFee, duration, availibility = []) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const url = "event";
    let descriptionField = description;
    if(!descriptionField) {
        descriptionField = "-";
    }
    request.append("type", 3);
    request.append("organization_id", window.$nuxt.$store.state.Organization.default.id);
    request.append("name", name);
    request.append("description", descriptionField);
    request.append("tz", timezone);
    request.append("is_ticket_fee", meetingType);
    request.append("ticket_fee", ticketFee);
    request.append("duration", duration);
    availibility.forEach((value, index) => {
        request.append("availability[" + index + "][weekday]", value.weekday);
        request.append("availability[" + index + "][hour_minute]", value.hour_minute);
    });
    if(thumbnail) {
        request.append("image", thumbnail);
    }
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Booking pertemuan berhasil dibuat");
    } catch(e) {
    }

    return response;
}

const storeMeetingRoom = async (name, description, thumbnail) => {
    let response = {}; 
    let ajaxResponse;
    const request = new FormData();
    let ajax;
    const url = "event";
    let descriptionField = description;
    if(!descriptionField) {
        descriptionField = "-";
    }
    const timezone = window.Intl.DateTimeFormat().resolvedOptions().timeZone;

    request.append("type", 2);
    request.append("organization_id", window.$nuxt.$store.state.Organization.default.id);
    request.append("name", name);
    request.append("description", descriptionField);
    request.append("tz", timezone);
    request.append("is_ticket_fee", 0);
    if(thumbnail) {
        request.append("image", thumbnail);
    }
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Ruang meeting berhasil dibuat");
    } catch(e) {
    }

    return response;
}

const archive = async (id) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const url = "event/" + id + "/archiving";

    request.is_archived = 1;
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Event berhasil diarsipkan");
    } catch(e) {
    }

    return response;
}


const unarchive = async (id) => {
    let response = {}; 
    let ajaxResponse;
    const request = {};
    let ajax;
    const url = "event/" + id + "/archiving";

    request.is_archived = 0;
    try {
        ajax = await Base.axios().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Event berhasil dipulihkan");
    } catch(e) {
    }

    return response;
}

const list = async (isArchived = false, page = 1, status = null) => {
    let response = []; 
    let ajaxResponse;
    const request= {};
    let ajax;
    const url = "event";
    request.is_archived = isArchived ? 1 : 0;
    request.page = page;
    request.organization_id = window.$nuxt.$store.state.Organization.default.id;
    if(status !== null) {
        request.status = status;
    }
    const params = { params: request }
    try {
        ajax = await Base.axios().get(url, params);
        ajax = ajax.data;
        ajaxResponse = ajax.data.data; 
        response = ajaxResponse.map(value => {
            const response = {};            
            response.id = value.id;
            response.title = value.name;
            response.imageUrl = value.thumbs.image_path;
            response.date = "";
            response.startDate = null;
            response.endDate = null;
            if(value.dates.length > 0) {
                response.date = moment(value.dates[0].timestamp)
                .tz(value.tz)
                .format("DD MMMM YYYY");
                response.startDate = moment(value.dates[0].timestamp)
                .tz(value.tz)
                .format("YYYY-MM-DD");
                response.startDateTime = moment(value.dates[0].timestamp)
                .tz(value.tz)
                .format("YYYY-MM-DD HH:mm");
                response.startTime = moment(value.dates[0].timestamp)
                .tz(value.tz)
                .format("HH:mm");
            }
            if(value.dates.length > 1) {
                response.endDate = moment(value.dates[1].timestamp)
                .tz(value.tz)
                .format("YYYY-MM-DD");
                response.endDateTime = moment(value.dates[1].timestamp)
                .tz(value.tz)
                .format("YYYY-MM-DD HH:mm");
                response.endTime = moment(value.dates[1].timestamp)
                .tz(value.tz)
                .format("HH:mm");
            }
            switch(value.status) {
                case 1:
                    response.status = "scheduled";
                    break;
                case 2:
                    response.status = "ongoing";
                    break;
                case 3:
                    response.status = "finished";
                    break;
            }

            if(value.is_archived === true) {
                response.status = "archived";
            }

            switch(value.type) {
                case 1:
                    response.eventType = "Jadwal Meeting";
                    break;
                case 2:
                    response.eventType = "Ruang Meeting";
                    break;
                case 3:
                    response.eventType = "Booking Pertemuan";
                    break;
                case 4:
                    response.eventType = "Conferences";
                    break;
            }

            return response;
        })
    } catch(e) {
    }

    return response;
}

const show = async (id) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "event/" + id;
    try {
        ajax = await Base.axios().get(url);
        ajax = ajax.data;
        ajaxResponse = ajax.data; 
        response = ajaxResponse;
        response.thumbnailUrl = response.thumbs.image_path;
        if(response.dates.length > 0) {
            response.date = moment(response.dates[0].timestamp).tz(response.tz);
            response.startDateTime = moment(response.dates[0].timestamp).tz(response.tz).format("YYYY-MM-DD HH:mm");
            response.endDateTime = moment(response.dates[1].timestamp).tz(response.tz).format("YYYY-MM-DD HH:mm");
            response.readableDate = moment(response.dates[0].timestamp).tz(response.tz).format("YYYY-MM-DD");
            response.readableStartDate = moment(response.dates[0].timestamp).tz(response.tz).format("YYYY-MM-DD");
            response.readableEndDate = moment(response.dates[1].timestamp).tz(response.tz).format("YYYY-MM-DD");
            response.readableDateLabel = moment(response.dates[0].timestamp).tz(response.tz).format("dddd, DD MMMM YYYY");
            response.startDateLabel = moment(response.dates[0].timestamp).tz(response.tz).format("dddd, DD MMMM YYYY");
            response.endDateLabel = moment(response.dates[1].timestamp).tz(response.tz).format("dddd, DD MMMM YYYY");
            response.startTimeLabel = moment(response.dates[0].timestamp).tz(response.tz).format("HH:mm");
            response.endTimeLabel = moment(response.dates[1].timestamp).tz(response.tz).format("HH:mm");
        }
        response.organizerName = "";
        if(response.organizer) {
            response.organizerName = response.organizer.name;
        }

        response.organizationName = "";
        if(response.organization) {
            response.organizationName = response.organization.name;
        }

        const emailData = response.contacts.find(value => value.parameter === "email");
        const phoneData = response.contacts.find(value => value.parameter === "phone");
        response.contactPersonEmail = emailData ? emailData.value : ""
        response.contactPersonPhone = phoneData ? phoneData.value : ""

        const timezone = Timezone.find(value => value.name === response.tz);
        response.timezoneHour = timezone ? timezone.time : "";
        response.timezoneType = timezone ? timezone.type : "";

        response.eventTypeSlug = "";
        switch(response.type) {
            case 1:
                response.eventTypeSlug = "schedule";
                break;
            case 2:
                response.eventTypeSlug = "room";
                break;
            case 3:
                response.eventTypeSlug = "booking";
                break;
            case 4:
                response.eventTypeSlug = "conferences";
                break;
        }
        response.statusSlug = "";
        switch(response.status) {
            case 1:
                response.statusSlug = "scheduled";
                break;
            case 2:
                response.statusSlug = "ongoing";
                break;
            case 3:
                response.statusSlug = "finished";
                break;
        }

        window.$nuxt.$store.commit("Event/changeVisited", response);
    } catch(e) {
    }

    return response;
}

const updateDescription  = async (description) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const id = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + id;
    const name = window.$nuxt.$store.state.Event.visited.name;
    const tz = window.$nuxt.$store.state.Event.visited.tz;
    const startDate = window.$nuxt.$store.state.Event.visited.startDateTime;
    const endDate = window.$nuxt.$store.state.Event.visited.endDateTime;
    const request = {
        name,
        tz,
        description,
        datetime_start: startDate,
        datetime_end: endDate
    };

    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Event berhasil diupdate");
    } catch(e) {
    }

    return response;
}

const updateInfo  = async (name, timezone, startDate, startTime, endDate, endTime) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const id = window.$nuxt.$store.state.Event.visited.id;
    const url = "event/" + id;
    const tz = timezone;
    const description = window.$nuxt.$store.state.Event.visited.description;
    const startDateTime = startDate ? (startDate + " " + startTime) : "";
    const endDateTime = endDate ? (endDate + " " + endTime) : "";
    const request = {
        name,
        tz,
        description
    };
    if(startDateTime) {
        request.datetime_start = startDateTime;
    }
    if(endDateTime) {
        request.datetime_end = endDateTime;
    }

    try {
        ajax = await Base.axios().put(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse; 
        window.$nuxt.$toast.success("Event berhasil diupdate");
    } catch(e) {
    }

    return response;
}

const start  = async (eventId) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "panel/event-start"
    const request = {
        event_id: eventId
    };

    try {
        ajax = await Base.second().post(url, request);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data; 
    } catch(e) {
    }

    return response;
}

export default {
    storeMeetingSchedule,
    storeMeetingBook,
    storeMeetingRoom,
    storeConference,
    updateDescription,
    updateInfo,
    archive,
    unarchive,
    show,
    start,
    list
};