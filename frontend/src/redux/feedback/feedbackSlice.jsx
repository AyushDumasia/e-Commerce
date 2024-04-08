import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    feedbackCard: null,
    apiError: null,
}

export const feedbackSlice = createSlice({
    name: 'feedbackCard',
    initialState,
    reducers: {
        setFeedbackCard: (state, action) => {
            state.feedbackCard = action.payload
        },
        setApiError: (state, action) => {
            state.apiError = action.payload
        },
    },
})

export const {setFeedbackCard, setApiError} = feedbackSlice.actions

export default feedbackSlice.reducer
