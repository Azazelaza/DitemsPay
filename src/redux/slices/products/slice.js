import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    price: 0,
    quantity: 0,
    image: '',
}

const ProductSlice = createSlice({
    name: 'ProductSlice',
    initialState,
    reducers: {
        setProduct: (state, { payload }) => {
            state.name = payload.name
            state.price = payload.price
            state.quantity = 1
            state.image = payload.principal_image
        },
    },
})

export const {
    setProduct
} = ProductSlice.actions
export default ProductSlice.reducer