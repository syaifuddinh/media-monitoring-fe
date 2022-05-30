import moment from "moment";

export const state = () => ({
    startDate: moment().subtract(7, "d").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD")
});

export const mutations = {
    setStartDate(state, value) {
        state.startDate = value;
    },
    setEndDate(state, value) {
        state.endDate = value;
    }
}
