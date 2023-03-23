const voteAction = (id) => {
    return {
        type: 'VOTE',
        payload: id
    }
}

export {
    voteAction
}