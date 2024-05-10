import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    adminPanel: null,
    apiError: null,
}

const adminPanelSlice = createSlice({
    name: 'adminPanel',
    initialState,
    reducers: {
        setAdminPanel: (state, action) => {
            state.adminPanel = action.payload
        },
        setApiError: (state, action) => {
            state.apiError = action.payload
        },
    },
})

export const {setAdminPanel, setApiError} = adminPanelSlice.actions

export default adminPanelSlice.reducer
