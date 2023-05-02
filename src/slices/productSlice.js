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
            // console.log(state.allProducts)
        },

        filteredProductsAction: (state, payload) => {
            state.filterdProducts = payload.payload;
            // console.log(state.allProducts)
        },
    },
});

const { reducer, actions } = productSlice;

export const { addProductsAction, filteredProductsAction } = actions

export default reducer;