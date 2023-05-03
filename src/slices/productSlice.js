import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProducts: [],
    filterdProducts: []
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProductsAction: (state, payload) => {
            state.allProducts = payload.payload;
        },

        filteredProductsAction: (state, payload) => {
            state.filterdProducts = payload.payload;
        },
    },
});

const { reducer, actions } = productSlice;

export const { addProductsAction, filteredProductsAction } = actions

export default reducer;