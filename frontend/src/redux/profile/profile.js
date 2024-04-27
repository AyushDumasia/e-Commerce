import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    profile: null,
    errprofile: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        setErrprofile: (state, action) => {
            state.errprofile = action.payload
        },
    },
})

export const {setProfile, setErrprofile} = profileSlice.actions

export default profileSlice.reducer
