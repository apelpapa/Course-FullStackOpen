import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = (newBlogPost) => {
  const response = axios.post(baseUrl, newBlogPost)
}

export default { getAll, postBlog }