import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    exploreCard: null,
    apiError: null,
}

export const exploreSlice = createSlice({
    name: 'exploreCard',
    initialState,
    reducers: {
        setExploreCard: (state, action) => {
            state.exploreCard = action.payload
        },
        setApiError: (state, action) => {
            state.apiError = action.payload
        },
    },
})

export const {setExploreCard, setApiError} = exploreSlice.actions

export default exploreSlice.reducer
