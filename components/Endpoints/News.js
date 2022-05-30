import moment from "moment";
import Base from "./Base.js";

const list = async ({keyword, startDate, endDate, paging}) => {
    let response = {}; 
    let ajaxResponse;
    const params = {keyword, startDate, endDate};
    let ajax;
    const url = "news";
    params.page = paging.page;
    params.length = paging.length;
    try {
        ajax = await Base.axios().get(url, { params });
        ajaxResponse = ajax.data;
        response = ajaxResponse.data; 
        response.list = response.list.map(value => {
            const response = value;
            response.readablePublishedDate = moment(value.publishedDate).format("DD MMMM YYYY");

            return response;
        });
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const chart = async ({keyword, startDate, endDate}) => {
    let response = {}; 
    let ajaxResponse;
    const params = {keyword, startDate, endDate};
    let ajax;
    const url = "news/chart";
    try {
        ajax = await Base.axios().get(url, { params });
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        response.readableInterval = response.interval.map(v => moment(v).format("DD MMMM YYYY"))
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

export default {
    chart,
    list
};