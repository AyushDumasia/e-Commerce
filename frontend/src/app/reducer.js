import {createReducer} from '@reduxjs/toolkit'

const initialState = {
    c: 0,
}

export const customerReducer = createReducer(initialState, {
    increment: (state, action) => {
        state.c = state.c + 1
    },
})
