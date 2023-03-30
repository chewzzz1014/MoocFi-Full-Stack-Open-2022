const addNotification = (value) => {
    return {
        type: 'notifications/addNotification',
        payload: value
    }
}

const removeNotification = (value) => {
    return {
        type: 'notifications/addNotification',
    }
}