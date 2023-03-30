import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        addNotification(state, action) {
            state.push(`added ${action.payload}`)
        },
        removeNotification(state, action) {
            state.filter(n => n !== action.payload)
        }
    }
})

// export action creators
export const { addNotification, removeNotification } = notificationSlice.actions
// export reducer 
export default notificationSlice.reducer
