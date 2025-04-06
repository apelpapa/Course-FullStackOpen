import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        createBlog(state, action) {
            console.log('creating blog')
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const { createBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const response = await blogService.getAll()
        dispatch(setBlogs(response))
    }
}

export default blogSlice.reducer