import moment from "moment";

export const state = () => ({
    sentiment: "",
    startDate: moment().subtract(7, "d").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD")
});

export const mutations = {
    changeSentiment(state, value) {
        state.sentiment = value;
    },
    setStartDate(state, value) {
        state.startDate = value;
    },
    setEndDate(state, value) {
        state.endDate = value;
    }
}
