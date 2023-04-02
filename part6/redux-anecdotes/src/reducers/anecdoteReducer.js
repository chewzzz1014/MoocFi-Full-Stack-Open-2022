import { createSlice } from '@reduxjs/toolkit'
import * as anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE':
//       return state.map(a => {
//         return a.id === action.payload ? { ...a, votes: a.votes + 1 } : a
//       })
//     case 'ADD':
//       return [
//         ...state,
//         action.payload
//       ]
//     default:
//       return state
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const { id } = action.payload
      return state.map(a => a.id === id ? action.payload : a)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

// export action creators
export const { voteAnecdote, addAnecdote, setAnecdote } = anecdoteSlice.actions

// export action creators
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdoteActionCreator = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.increaseVote(id)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

// export reducer 
export default anecdoteSlice.reducer


// export default reducer
// export {
//   getId
// }