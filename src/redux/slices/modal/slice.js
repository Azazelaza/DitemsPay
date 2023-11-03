import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: '',
    data: {},
}

const ModalSlice = createSlice({
    name: 'ModalSlice',
    initialState,
    reducers: {
        showModal: (state, { payload }) => {
            state.show = payload.name;
            state.data = payload.data;
        },
        hiddenModal: (state) => {
            state.show = '';
            state.data = {};
        },
    },
})

export const {
    showModal,
    hiddenModal,
} = ModalSlice.actions
export default ModalSlice.reducer