import { createSlice } from "@reduxjs/toolkit"

const filterReducer = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterAnecdote(state, action) {
            return action.payload
        }
    }
})

export const { filterAnecdote } = filterReducer.actions
export default filterReducer.reducer