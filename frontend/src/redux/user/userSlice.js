import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    apiError: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setApiError: (state, action) => {
            state.apiError = action.payload
        },
    },
})

export const {setUser, setApiError} = userSlice.actions

export default userSlice.reducer
