import { createSlice } from '@reduxjs/toolkit';

const initialStatus = {
    states: [],
    address: {},
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
        }
    }
})

export const { setStates, setAddress} = AddressSlice.actions;
export default AddressSlice.reducer