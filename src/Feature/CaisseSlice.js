import { createSlice } from "@reduxjs/toolkit";

export const CaisseSlice = createSlice({
  name: "caisse",
  initialState: {
    caisse: [],
    histo_depense: [],
    histo_decaisse: [],
    histo_tresorerie: [],
  },
  reducers: {
    setcaisse: (state, { payload }) => {
      state.caisse = payload;
      //   localStorage.setItem("caisse", JSON.stringify(payload));
    },
    sethisto_depense: (state, { payload }) => {
      if (payload) {
        state.histo_depense = payload;
        state.histo_depense = state.histo_depense.sort(function (a, b) {
          var key1 = new Date(a.date);
          var key2 = new Date(b.date);
          if (key1 < key2) {
            return 1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return -1;
          }
        });
      }
      //   localStorage.setItem("caisse", JSON.stringify(payload));
    },
    sethisto_decaisse: (state, { payload }) => {
      if (payload) {
        state.histo_decaisse = payload;
        state.histo_decaisse = state.histo_decaisse.sort(function (a, b) {
          var key1 = new Date(a.date);
          var key2 = new Date(b.date);
          if (key1 < key2) {
            return 1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return -1;
          }
        });
      }
      //   localStorage.setItem("caisse", JSON.stringify(payload));
    },
    sethisto_tresorerie: (state, { payload }) => {
      if (payload) {
        state.histo_tresorerie = payload;
        state.histo_tresorerie = state.histo_tresorerie.sort(function (a, b) {
          var key1 = new Date(a.date);
          var key2 = new Date(b.date);
          if (key1 < key2) {
            return 1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return -1;
          }
        });
      }
      //   localStorage.setItem("caisse", JSON.stringify(payload));
    },
  },
});

export const {
  setcaisse,
  sethisto_decaisse,
  sethisto_depense,
  sethisto_tresorerie,
} = CaisseSlice.actions;
export default CaisseSlice.reducer;
