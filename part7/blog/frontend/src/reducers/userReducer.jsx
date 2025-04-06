import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState: null,
    reducers: {
        setUser (state, action) {
            return action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export const checkUser = () => {
    return (dispatch) => {
        const storedUser = window.localStorage.getItem("loggedUser");
        dispatch(setUser(JSON.parse(storedUser)))
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(setUser(null))
    }
}

export default userSlice.reducer