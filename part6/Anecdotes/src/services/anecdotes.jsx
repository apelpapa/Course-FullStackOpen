import axios from 'axios'

const baseURL = 'http://localhost:3002/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const newAnecdote = async (anecdote) => {
    const sendObject = {
        content: anecdote,
        votes: 0
      }
    const response = await axios.post(baseURL, sendObject)
    console.log(response.data)
    return response.data
}

export default { getAll, newAnecdote }