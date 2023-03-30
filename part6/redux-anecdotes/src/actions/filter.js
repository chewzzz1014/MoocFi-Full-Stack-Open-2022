const filter = (value) => {
    return {
        type: 'filter/filterAnecdote',
        payload: value
    }
}

export {
    filter
}