import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name:'filters',
    initialState: '',
    reducers: {
        filterInput(state, action) {
            return action.payload
        }
    }

})

export const { filterInput } = filterSlice.actions
export default filterSlice.reducer