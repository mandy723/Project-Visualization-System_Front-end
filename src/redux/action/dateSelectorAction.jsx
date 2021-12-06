export function setStartDate(startDate) {
    return {
        type: "SET_START_DATE",
        startDate: startDate
    }
}


export function setEndDate(endDate) {
    return {
        type: "SET_END_DATE",
        endDate: endDate
    }
}