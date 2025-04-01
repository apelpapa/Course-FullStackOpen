import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    castVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    },
    newAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { newAnecdote, castVote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const response = await anecdoteService.newAnecdote(content);
    dispatch(newAnecdote(response));
    return response;
  };
};

export const upVote = (id) => {
  return async (dispatch) => {
    const response = await anecdoteService.voteAnecdote(id);
    dispatch(castVote(response));
  };
};

export default anecdoteSlice.reducer;
