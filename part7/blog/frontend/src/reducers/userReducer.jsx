import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/users'
import { showMessage, clearMessage } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const checkUser = () => {
  return (dispatch) => {
    const storedUser = window.localStorage.getItem("loggedUser");
    dispatch(setUser(JSON.parse(storedUser)));
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.clear()
    dispatch(setUser(null));
  };
};

export const loginAttempt = (userAttempt) => {
  return async (dispatch) => {
    const loggedUser = await userService.login(userAttempt);
    dispatch(setUser(loggedUser))
    !loggedUser
      ? dispatch(
          showMessage("Error: Invalid Username and/or Password. Try Again"),
        )
      : dispatch(clearMessage());
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
    window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  };
};

export default userSlice.reducer;
