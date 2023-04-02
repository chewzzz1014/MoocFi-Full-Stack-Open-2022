import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        addNotification(state, action) {
            state.push(action.payload)
        },
        removeNotification(state, action) {
            return []
        },
    }
})

// export action creators
export const {
    addNotification,
    removeNotification
} = notificationSlice.actions

// export action creator
export const setNotification = (content, time) => {
    return async (dispatch) => {
        dispatch(addNotification(content))

        setTimeout(() => {
            dispatch(removeNotification())
        }, time)
    }
}

// export reducer 
export default notificationSlice.reducer
