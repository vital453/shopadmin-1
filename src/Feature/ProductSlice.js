import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [], 
        categories: [],
        trigg1: false,
    },
    reducers: {
        recupProduct: (state, {payload}) => {
            if(payload){
                state.product = payload; 
                state.product = state.product.sort(function (a, b) {
                    var key1 = new Date(a.creation_date);
                    var key2 = new Date(b.creation_date);
                    if (key1 < key2) {
                      return 1;
                    } else if (key1 == key2) {
                      return 0;
                    } else {
                      return -1;
                    }
                  })
            }
        },
        recupCateg: (state, {payload}) => {
            if(payload){
                state.categories = payload; 
            }
        },
        decc: (state, { payload }) => {
            state.trigg1 = payload;
           
        }
    }
}); 

export const {recupProduct, recupCateg, decc} = productSlice.actions;
export default productSlice.reducer; 