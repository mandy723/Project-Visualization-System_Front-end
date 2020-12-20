import { combineReducers } from 'redux';
import selectedMonthReducer from './monthSelector';

const rootReducer = combineReducers({
    selectedMonth: selectedMonthReducer
})

export default rootReducer;