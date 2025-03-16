import axios from "axios";

const baseUrl = "/api/login";

const login = async (userAttempt) => {
  try {
    const response = await axios.post(baseUrl, userAttempt);
    return response.data;
  } catch {
    console.log("Login Failed");
    return null
  }
};

export default {login};
