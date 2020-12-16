import { combineReducers } from 'redux';
import selectedDateReducer from './dateSelector'
import selectedMonthReducer from './monthSelector';

const rootReducer = combineReducers({
    selectedMonth: selectedMonthReducer,
    selectedDate: selectedDateReducer
})

export default rootReducer;