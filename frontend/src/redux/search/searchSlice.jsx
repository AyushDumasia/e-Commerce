import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    searchCard: null,
    apiError: null,
}

export const searchSlice = createSlice({
    name: 'searchCard',
    initialState,
    reducers: {
        setSearchCard: (state, action) => {
            state.searchCard = action.payload
        },
        setApiError: (state, action) => {
            state.apiError = action.payload
        },
    },
})

export const {setSearchCard, setApiError} = searchSlice.actions

export default searchSlice.reducer
