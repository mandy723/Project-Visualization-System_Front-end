import { combineReducers } from 'redux';
import selectedDateReducer from './dateSelector'

const rootReducer = combineReducers({
    selectedDate: selectedDateReducer
})

export default rootReducer;