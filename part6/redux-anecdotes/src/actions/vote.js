const voteAction = (id) => {
    return {
        type: 'anecdotes/voteAnecdote',
        payload: id
    }
}

const addAction = (newContent) => {
    return {
        type: 'anecdotes/addAnecdote',
        payload: newContent
    }
}

export {
    voteAction,
    addAction
}