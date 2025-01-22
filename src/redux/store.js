import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reduces/authSlice';
import { productReducer } from './reduces/productSlice';
import { wishlistCartReducer } from './reduces/wishlistCartSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        wishlistCart: wishlistCartReducer,
    },
});
