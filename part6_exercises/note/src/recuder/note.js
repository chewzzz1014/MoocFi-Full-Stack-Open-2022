// reducer must be pure function
// pure function: do not cause any side effects and must return the same response when called with the same parameters

const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}

export {
    noteReducer
}