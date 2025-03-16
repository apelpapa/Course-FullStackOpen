import axios from "axios";

const baseUrl = "/api/blogs";

const tokenHeader = (token) => {
  const auth = {
    Authorization: `Bearer ${token}`,
  };

  return auth;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);

  return request.data;
};

const postBlog = async (newBlogPost, token) => {
  const response = await axios.post(baseUrl, newBlogPost, {
    headers: tokenHeader(token),
  });

  return response.data;
};

const updateBlog = async (blogID, updatedBlogPost, token) => {
  const response = await axios.put(`${baseUrl}/${blogID}`, updatedBlogPost, {
    headers: tokenHeader(token),
  });

  return response.data;
};

const deleteBlog = async (blogID, token) => {
  const response = await axios.delete(`${baseUrl}/${blogID}`, {
    headers: tokenHeader(token),
  });

  return response.data;
};

export default { getAll, postBlog, updateBlog, deleteBlog };
