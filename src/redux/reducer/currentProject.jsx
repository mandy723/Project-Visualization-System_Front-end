const currentProjectReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_CURRENT_PROJECT":
            console.log(action)
            return action.selectedProject
        default:
            return state
    }
}

export default currentProjectReducer