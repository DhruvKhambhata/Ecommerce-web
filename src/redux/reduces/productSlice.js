import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [
        { id: 1, name: 'Product A', price: 100, description: 'Description of Product A' },
        { id: 2, name: 'Product B', price: 200, description: 'Description of Product B' },
        { id: 3, name: 'Product C', price: 300, description: 'Description of Product C' },
    ],
    selectedProduct: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        viewProductDetails: (state, action) => {
            state.selectedProduct = state.products.find((product) => product.id === action.payload);
        },
    },
});

export const { viewProductDetails } = productSlice.actions;
export const productReducer =  productSlice.reducer;
export default productSlice;