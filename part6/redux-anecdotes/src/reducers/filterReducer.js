const reducer = (state, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.payload
        default:
            return state
    }
}

export default reducer