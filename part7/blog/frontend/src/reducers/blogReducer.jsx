import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showMessage, clearMessage } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    newBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    upvoteBlog(state, action) {
      return state.map((state) => {
        return state.id === action.payload.id ? action.payload : state;
      });
    },
    removeBlog(state, action) {
      return state.filter((state) => state.id != action.payload);
    },
  },
});

export const { newBlog, setBlogs, upvoteBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    dispatch(setBlogs(response));
  };
};

export const addBlog = (content, userToken) => {
  return async (dispatch) => {
    try {
      const response = await blogService.postBlog(content, userToken);
      console.log(response);
      dispatch(newBlog(response));
      dispatch(
        showMessage(`Added Blog: ${response.title} - by: ${response.author}`),
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    } catch (error) {
      console.error("Error Posting Blog", error);
    }
  };
};

export const likeBlog = (content, token) => {
  return async (dispatch) => {
    try {
      const response = await blogService.likeBlog(content.id, token);
      dispatch(upvoteBlog(response));
      dispatch(
        showMessage(`You liked "${response.title}" by ${response.author}`),
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    } catch (error) {
      console.error("Error liking the blog:", error);
      dispatch(showMessage(`Error: Failed to like the post`));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  };
};

export const deleteBlog = (blog, userToken) => {
  return async (dispatch) => {
    try {
      const response = await blogService.deleteBlog(blog.id, userToken);
      dispatch(removeBlog(response.id));
    } catch (error) {
      console.error("Failed To Delete", error);
    }
  };
};

export default blogSlice.reducer;
