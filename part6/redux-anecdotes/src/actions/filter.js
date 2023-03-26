const filter = (value) => {
    return {
        type: 'FILTER',
        payload: value
    }
}

export {
    filter
}