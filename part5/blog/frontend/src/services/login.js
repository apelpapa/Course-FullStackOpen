import axios from 'axios'

const baseUrl = '/api/login'

const login = async (userAttempt) => {
  try {
    const response = await axios.post(baseUrl, userAttempt)
    return response.data
  } catch (error) {
    console.error(`Login Failed: ${error}`)
    return null
  }
}

export default { login }