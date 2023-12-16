import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false
    },
    reducers: {
        signIn: state => {
            state.isLogin = true
        },
        signOut: state => {
            state.isLogin = false
        },
    }
})

// Action creators are generated for each case reducer function
export const { signIn, signOut } = userSlice.actions

export default userSlice.reducer