import { createSlice } from '@reduxjs/toolkit';

const initialStatus = {
    status: 'not-auth',
    checking: 0,
    id: null,
    email: null,
    phone: null,
    photoURL: null,
    address: [],
    billing: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialStatus,
    reducers: {
        setLogin: (state, { payload }) => {
            state.status = 'auth'
            state.id = payload.id
            state.username = payload.username
            state.phone = payload.phone
            state.email = payload.email
            state.address = payload.address
            state.billing = payload.billing ?? []
            state.checking = 0
        },
        setAddressUser: (state, { payload }) => {
            state.address = payload
        },
        logout: (state, { payload }) => {
            state.status = 'not-auth'
            state.id = null
            state.username = null
            state.email = null
            state.checking = 0
        },
        renew: (state) => {
            state.checking = 1
        },
        endrenew: (state) => {
            state.checking = 0
        }
    }
})

export const { setLogin, logout, renew, register, endrenew, setAddressUser } = authSlice.actions;
export default authSlice.reducer