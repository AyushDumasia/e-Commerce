import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    merchant: null,
    errMerchant: null,
}

export const merchantSlice = createSlice({
    name: 'merchant',
    initialState,
    reducers: {
        setMerchant: (state, action) => {
            state.merchant = action.payload
        },
        setErrMerchant: (state, action) => {
            state.errMerchant = action.payload
        },
    },
})

export const {setMerchant, setErrMerchant} = merchantSlice.actions

export default merchantSlice.reducer
