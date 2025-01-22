import { createSlice } from '@reduxjs/toolkit';

const wishlistCartSlice = createSlice({
    name: 'wishlistCart',
    initialState: {
        cart: [],
        wishlist: []
    },
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.cart.find(product => product.id === action.payload?.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const product = { ...action.payload, quantity: 1 };
                state.cart.push(product);
            }
        },
        addToWishlist: (state, action) => {
            state.wishlist.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(product => product.id !== action.payload);
        },
        updateCartItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const product = state.cart.find(product => product.id === id);
            if (product) {
                product.quantity = quantity;
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter(product => product.id !== action.payload);
        }
    }
});

export const { addToCart, addToWishlist, removeFromCart, updateCartItemQuantity, removeFromWishlist } = wishlistCartSlice.actions;
export const wishlistCartReducer= wishlistCartSlice.reducer;