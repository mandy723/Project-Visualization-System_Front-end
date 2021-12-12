import moment from "moment";

const init = {
  startDate: moment().subtract(1, "years").format("YYYY-MM-DD"),
  endDate: moment().format("YYYY-MM-DD"),
};

const selectedDateReducer = (state = init, action) => {
  switch (action.type) {
    case "SET_START_DATE":
      console.log(action);
      return { ...state, startDate: action.startDate };
    case "SET_END_DATE":
      console.log(action);
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

export default selectedDateReducer;
