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