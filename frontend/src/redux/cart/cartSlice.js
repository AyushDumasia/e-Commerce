import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cart: null,
    apiError: null,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        setApiError: (state, action) => {
            state.apiError = action.payload
        },
    },
})

export const {setCart, setApiError} = cartSlice.actions

export default cartSlice.reducer
