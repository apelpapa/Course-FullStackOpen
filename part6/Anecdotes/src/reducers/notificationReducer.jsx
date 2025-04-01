import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name:'notifications',
    initialState: '',
    reducers:{
        showMessage(state, action){
            return action.payload
        },
        removeMessage(){
            return ''
        }
    }
})

export const { showMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer