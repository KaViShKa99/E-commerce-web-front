import { configureStore, createReducer } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import cartSlice from './slices/cartSlice';
import productSlice from './slices/productSlice';

const reducer = {
    auth: authReducer,
    message: messageReducer,
    cart: cartSlice,
    product: productSlice

}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;