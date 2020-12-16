import { combineReducers } from 'redux';
import currentProjectReducer from './currentProject';
import selectedMonthReducer from './monthSelector';

const rootReducer = combineReducers({
    selectedMonth: selectedMonthReducer,
    currentProject: currentProjectReducer
})

export default rootReducer;