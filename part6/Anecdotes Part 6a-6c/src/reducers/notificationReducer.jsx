import { createSlice } from "@reduxjs/toolkit";

let timerId;

const notificationSlice = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    showMessage(state, action) {
      return action.payload;
    },
    removeMessage() {
      return "";
    },
  },
});

export const { showMessage, removeMessage } = notificationSlice.actions;

export const notificationManager = (message, time) => {
  return (dispatch) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    dispatch(showMessage(message));
    timerId = setTimeout(() => {
      dispatch(removeMessage());
      timerId = null;
    }, time * 1000);
  };
};

export default notificationSlice.reducer;