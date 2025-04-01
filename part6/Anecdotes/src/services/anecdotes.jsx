import axios from "axios";

const baseURL = "http://localhost:3002/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const newAnecdote = async (anecdote) => {
  const sendObject = {
    content: anecdote,
    votes: 0,
  };
  const response = await axios.post(baseURL, sendObject);
  return response.data;
};

const voteAnecdote = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`);
  const updatedAnecdote = { ...response.data, votes: response.data.votes + 1 };
  try {
    const votedAnecdote = await axios.put(`${baseURL}/${id}`, updatedAnecdote);
    return votedAnecdote.data;
  } catch (error) {
    console.error("Error updating anecdote:", error);
    throw error;
  }
};

export default { getAll, newAnecdote, voteAnecdote };
