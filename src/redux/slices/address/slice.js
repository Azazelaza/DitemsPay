import { createSlice } from '@reduxjs/toolkit';

const initialStatus = {
    states: [],
    address: JSON.parse(sessionStorage.getItem('address')) ?? {},
    cfdi: [],
    billing: {},
}

export const AddressSlice = createSlice({
    name: 'address',
    initialState: initialStatus,
    reducers: {
        setStates: (state, { payload }) => {
            state.states = payload
        },
        setAddress: (state, { payload }) => {
            state.address = payload
        },
        setCfdi: (state, { payload }) => {
            state.cfdi = payload
        },
        setBilling: (state, { payload }) => {
            state.billing = payload
        }
    }
})

export const { setStates, setAddress, setCfdi, setBilling } = AddressSlice.actions;
export default AddressSlice.reducer