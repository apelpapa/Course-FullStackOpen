import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        newBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        upvoteBlog(state, action) {
            console.log(action.payload)
        }
    }
})

export const { newBlog, setBlogs, upvoteBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const response = await blogService.getAll()
        dispatch(setBlogs(response))
    }
}

export const addBlog = (content) => {
    return async (dispatch) => {

    }
}

export const likeBlog = (content) => {
    return async (dispatch) => {
        const response = await blogService.likeBlog(content.id)
        dispatch(upvoteBlog(content.id))
    }
}

export default blogSlice.reducer