import { getId } from "../reducers/anecdoteReducer"

const voteAction = (id) => {
    return {
        type: 'VOTE',
        payload: id
    }
}

const addAction = (newContent) => {
    return {
        type: 'ADD',
        payload: {
            content: newContent,
            id: getId(),
            votes: 0
        }
    }
}

export {
    voteAction,
    addAction
}