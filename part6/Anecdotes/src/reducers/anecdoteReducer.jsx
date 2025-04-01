import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    castVote(state, action) {
      return (state.map(anecdote => 
        anecdote.id !== action.payload
          ? anecdote 
          : { ...anecdote, votes: anecdote.votes + 1 }
        ))
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, castVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer