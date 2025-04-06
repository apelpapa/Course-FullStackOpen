import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        clearNotification(){
            return ''
        }
    }
})

export const { createNotification, clearNotification } = notificationSlice.actions

export const showMessage = (message) => {
    return dispatch => {
        dispatch(createNotification(message))
    }
}

export const clearMessage = () => {
    return dispatch => {
        dispatch (clearNotification())
    }
}


export default notificationSlice.reducer