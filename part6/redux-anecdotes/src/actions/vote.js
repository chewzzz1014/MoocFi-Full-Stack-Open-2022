const voteAction = (id) => {
    return {
        type: 'VOTE',
        payload: id
    }
}

const addAction = (newAnec) => {
    return {
        type: 'ADD',
        payload: newAnec
    }
}

export {
    voteAction,
    addAction
}