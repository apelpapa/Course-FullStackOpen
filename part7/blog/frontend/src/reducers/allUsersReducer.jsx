import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/users'

const allUsersSlice = createSlice({
    name:'allUsers',
    initialState:[],
    reducers:{
        setAllUsers(state, action){
            return action.payload
        }
    }
})

export const { setAllUsers } = allUsersSlice.actions

export const initializeAllUsers = () => {
    return async (dispatch) => {
        const response = await userService.getAll()
        dispatch(setAllUsers(response))
    }
}

export default allUsersSlice.reducer