import { combineReducers } from "redux";
import selectedMonthReducer from "./monthSelector";
import selectedDateReducer from "./dateSelector";
import currentProjectIdReducer from "./currentProjectId";

const rootReducer = combineReducers({
  selectedMonth: selectedMonthReducer,
  selectedDate: selectedDateReducer,
  currentProjectId: currentProjectIdReducer,
});

export default rootReducer;
