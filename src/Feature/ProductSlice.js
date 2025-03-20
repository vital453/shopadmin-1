import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    promotion: [],
    categories: [],
    trigg1: false,
    active: false,
  },
  reducers: {
    recupProduct: (state, { payload }) => {
      if (payload) {
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
        });
      }
    },
    recuppromotion: (state, { payload }) => {
      if (payload) {
        state.promotion = payload;
        state.promotion = state.promotion.sort(function (a, b) {
          var key1 = new Date(a.date_creation);
          var key2 = new Date(b.date_creation);
          if (key1 < key2) {
            return 1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return -1;
          }
        });
      }
    },
    recupCateg: (state, { payload }) => {
      if (payload) {
        state.categories = payload;
      }
    },
    decc: (state, { payload }) => {
      state.trigg1 = payload;
    },
    setactive: (state, { payload }) => {
      state.active = payload;
    },
  },
});

export const { recupProduct, recupCateg, decc, recuppromotion, setactive } =
  productSlice.actions;
export default productSlice.reducer;
