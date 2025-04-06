import axios from "axios";

const loginUrl = "/api/login";
const usersUrl = '/api/users'

const login = async (userAttempt) => {
  try {
    const response = await axios.post(loginUrl, userAttempt);
    return response.data;
  } catch (error) {
    console.error(`Login Failed: ${error}`);
    return null;
  }
};

const getAll = async () => {
  try{
    const response = await axios.get(usersUrl)
    return response.data
  } catch (error){
    console.log('Error Getting All Users', error)
  }
}

export default { login, getAll };