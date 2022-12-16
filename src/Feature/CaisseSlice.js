import { createSlice } from "@reduxjs/toolkit";

export const CaisseSlice = createSlice({
  name: "caisse",
  initialState: {
    caisse: [],
    histo_depense: [],
    histo_decaisse: [],
    
  },
  reducers: {
    setcaisse: (state, { payload }) => {
      state.caisse = payload;
    //   localStorage.setItem("caisse", JSON.stringify(payload));
    },
    sethisto_depense: (state, { payload }) => {
        state.histo_depense = payload;
      //   localStorage.setItem("caisse", JSON.stringify(payload));
    },
    sethisto_decaisse: (state, { payload }) => {
        state.histo_decaisse = payload;
      //   localStorage.setItem("caisse", JSON.stringify(payload));
    },
  },
});

export const { setcaisse, sethisto_decaisse, sethisto_depense } = CaisseSlice.actions;
export default CaisseSlice.reducer;
