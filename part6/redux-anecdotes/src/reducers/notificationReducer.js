import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
]

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification(state, action) {
            state.push(action.payload)
        },
        removeNotification(state, action) {
            state.filter(n => n !== action.payload)
        }
    }
})

// export action creators
export const { addNotification } = notificationSlice.actions
// export reducer 
export default notificationSlice.reducer
