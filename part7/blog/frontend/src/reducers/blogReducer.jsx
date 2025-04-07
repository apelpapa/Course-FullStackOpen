import { createSlice, current } from "@reduxjs/toolkit";
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
    newComment(state, action) {
      return state.map((state) => {
        return state.id === action.payload.id ? action.payload : state
      });
    },
  },
});

export const { newBlog, setBlogs, upvoteBlog, removeBlog, newComment } =
  blogSlice.actions;

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
      dispatch(newBlog(response));
      dispatch(
        showMessage(`Added Blog: ${response.title} - by: ${response.author}`),
      )
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
    } catch (error) {
      console.error("Error liking the blog:", error);
      dispatch(showMessage(`Error: Failed to like the post`));
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

export const addComment = (blog, comment, userToken) => {
  return async (dispatch) => {
    try {
      const response = await blogService.addComment(
        blog.id,
        comment,
        userToken,
      );
      dispatch(newComment(response));
      dispatch(
        showMessage(`You Added Comment: "${response.comments[response.comments.length-1].comment}"`),
      );
    } catch (error) {
      console.error("Failed To Add Comment:", error);
    }
  };
};

export default blogSlice.reducer;
