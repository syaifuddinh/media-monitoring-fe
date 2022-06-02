import moment from "moment";
import Base from "./Base.js";

const list = async ({keyword, startDate, endDate, sentiment, newsSource, paging}) => {
    let response = {}; 
    let ajaxResponse;
    const params = {keyword, startDate, endDate, sentiment, newsSource};
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

const downloadExcel = ({ startDate, endDate, sentiment, newsSource }) => {
    const params = { startDate, endDate, sentiment, newsSource };
    const queryString = new URLSearchParams(params).toString();
    const url = window.$nuxt.$config.baseUrl + "/news/excel?" + queryString;
    window.open(url, "_blank");
}

const downloadPdf = ({ startDate, endDate, sentiment, newsSource }) => {
    const params = { startDate, endDate, sentiment, newsSource };
    const queryString = new URLSearchParams(params).toString();
    const url = window.$nuxt.$config.baseUrl + "/news/pdf?" + queryString;
    window.open(url, "_blank");
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

const sentimentSummary = async ({keyword, startDate, endDate}) => {
    let response = {}; 
    let ajaxResponse;
    const params = {keyword, startDate, endDate};
    let ajax;
    const url = "news/chart/sentiment-summary";
    try {
        ajax = await Base.axios().get(url, { params });
        ajaxResponse = ajax.data;
        response = ajaxResponse.data.percentage;
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

const show = async (id) => {
    let response = {}; 
    let ajaxResponse;
    let ajax;
    const url = "news/" + id;
    try {
        ajax = await Base.axios().get(url);
        ajaxResponse = ajax.data;
        response = ajaxResponse.data;
        response.readableDate = moment(response.published_date).format("DD MMMM YYYY")
        response.description = response.textcontent;
    } catch(e) {
        throw new Error(e);
    }

    return response;
}

export default {
    show,
    chart,
    sentimentSummary,
    downloadPdf,
    downloadExcel,
    list
};