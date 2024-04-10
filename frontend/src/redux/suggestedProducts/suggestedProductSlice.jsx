import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    suggestedCard: null,
    apiError: null,
}

export const suggestedProductSlice = createSlice({
    name: 'suggestedCard',
    initialState,
    reducers: {
        setSuggestedCard: (state, action) => {
            state.suggestedCard = action.payload
        },
        setApiError: (state, action) => {
            state.apiError = action.payload
        },
    },
})

export const {setSuggestedCard, setApiError} = suggestedProductSlice.actions

export default suggestedProductSlice.reducer
