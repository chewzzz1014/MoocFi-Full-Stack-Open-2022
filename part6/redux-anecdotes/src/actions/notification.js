const addNotification = (value) => {
    return {
        type: 'notifications/addNotification',
        payload: value
    }
}

const removeNotification = (value) => {
    return {
        type: 'notifications/removeNotification',
        payload: value
    }
}

const voteNotification = (value) => {
    return {
        type: 'notifications/voteNotification',
        payload: value
    }
}

export {
    addNotification,
    removeNotification,
    voteNotification
}