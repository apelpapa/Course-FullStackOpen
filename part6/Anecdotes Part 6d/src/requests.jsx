import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(`${baseURL}/`);
    return response.data;
  } catch (error) {
    console.error(`Couldn't Get The Database`, error);
  }
};

export const postAnecdote = async (content) => {
  try {
    const newAnecdote = {
      content: content,
      votes: 0,
    };
    const response = await axios.post(`${baseURL}/`, newAnecdote);
    return response.data
  } catch (error) {
    console.error(`Couldn't Post The New Anecdote`, error);
  }
};

export const voteAnecdote = async (content) => {
    try{
        const votedContent = {...content, votes: content.votes+1}
        const response = await axios.put(`${baseURL}/${content.id}`, votedContent)
        return response.data
    }catch (error){
        console.error(`Couldn't Cast Vote`, error)
    }
}