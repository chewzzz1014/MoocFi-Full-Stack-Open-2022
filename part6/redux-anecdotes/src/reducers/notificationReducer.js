import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        addNotification(state, action) {
            state.push(`added ${action.payload}`)
        },
        removeNotification(state, action) {
            return []
        },
        voteNotification(state, action) {
            state.push(`you voted ${action.payload}`)
        }
    }
})

// export action creators
export const {
    addNotification,
    removeNotification,
    voteNotification
} = notificationSlice.actions

// export reducer 
export default notificationSlice.reducer
