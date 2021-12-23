const initialState = {
    data: [],
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_DATA":
        return {...state, data: action.payload}
        case "DELETE_DATA":
        return initialState
      default:
        return state
    }
}

export default globalReducer