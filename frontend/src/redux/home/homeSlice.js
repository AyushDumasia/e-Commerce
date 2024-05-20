import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    homeCard: null,
    apiError: null,
}

export const homeSlice = createSlice({
    name: 'homeCard',
    initialState,
    reducers: {
        setHomeCard: (state, action) => {
            state.homeCard = action.payload
        },
        setApiError: (state, action) => {
            state.apiError = action.payload
        },
    },
})

export const {setHomeCard, setApiError} = homeSlice.actions

export default homeSlice.reducer
