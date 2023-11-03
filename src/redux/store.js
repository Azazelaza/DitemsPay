import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice/authSlice';
import ModalSlice from './slices/modal/slice';
import ProductSlice from './slices/products/slice';
import AddressSlice from './slices/address/slice';

export const store = configureStore({
    reducer: {
        modal: ModalSlice,
        auth: authSlice,
        product: ProductSlice,
        address: AddressSlice
    }
})