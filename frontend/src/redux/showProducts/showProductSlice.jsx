import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    showProductCard: null,
    apiError: null,
}

export const showProductSlice = createSlice({
    name: 'showProductCard',
    initialState,
    reducers: {
        setProductCard: (state, action) => {
            state.showProductCard = action.payload
        },
        setApiError: (state, action) => {
            state.apiError = action.payload
        },
    },
})

export const {setProductCard, setApiError} = showProductSlice.actions

export default showProductSlice.reducer
