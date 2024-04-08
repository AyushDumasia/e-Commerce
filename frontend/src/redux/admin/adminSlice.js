import {createSlice} from '@reduxjs/toolkit'

// !NOT WORKING
const initialState = {
    adminCard: null,
    apiError: null,
}

const adminSlice = createSlice({
    name: 'adminCard',
    initialState,
    reducers: {
        setAdminCard: (state, action) => {
            state.adminCard = action.payload
        },
        setApiError: (state, action) => {
            state.apiError = action.payload
        },
    },
})

export const {setAdminCard, setApiError} = adminSlice.actions

export default adminSlice.reducer
