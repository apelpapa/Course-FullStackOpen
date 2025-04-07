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

let timeoutId = null

export const showMessage = (message, timeInSeconds = 5) => {
    return dispatch => {
        dispatch(createNotification(message))
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            dispatch(clearNotification())
        }, timeInSeconds * 1000)
    }
}

export const clearMessage = () => {
    return dispatch => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
        dispatch(clearNotification())
    }
}

export default notificationSlice.reducer