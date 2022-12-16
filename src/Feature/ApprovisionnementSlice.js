import { createSlice } from "@reduxjs/toolkit";

export const approvisionnementSlice = createSlice({
    name: "approvisionnement",
    initialState: {
        approvisionnement: []
    },
    reducers: {
        recupApprovisionnement: (state, {payload}) => {
            if(payload){
                state.approvisionnement = payload; 
                state.approvisionnement = state.approvisionnement.sort(function (a, b) {
                    var key1 = new Date(a.date);
                    var key2 = new Date(b.date);
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
    }
});

export const {recupApprovisionnement} = approvisionnementSlice.actions;
export default approvisionnementSlice.reducer;