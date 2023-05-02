import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCartItems: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItemAction: (state, { payload }) => {
            state.allCartItems = payload;
        },
    },
});

export const { addCartItemAction } = cartSlice.actions;

//it behave like connector (old redux)
export const cartSelector = (state) => state.cart;

export default cartSlice.reducer;