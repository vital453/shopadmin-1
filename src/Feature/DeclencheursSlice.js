import { createSlice } from "@reduxjs/toolkit";

export const declencheurSlice = createSlice({
    name: "triggers",
    initialState: {
        triggermod: false,
        declenche1: false,
        declenche2: false,
        oui: 1,
        non: 0,
    },
    reducers: {
        dectriggmod: (state, { payload }) => {
            state.triggermod = payload;
        },
        setdeclenche1: (state, { payload }) => {
            state.declenche1 = payload;
        },
        setdeclenche2: (state, { payload }) => {
            state.declenche2 = payload;
        },
        setoui: (state) => {
            state.oui = 1;
            state.non = 0;
        },
        setnon: (state) => {
            state.oui = 0;
            state.non = 1;
        },
    }
});

export const {dectriggmod, setdeclenche1, setdeclenche2,setoui, setnon } = declencheurSlice.actions;
export default declencheurSlice.reducer;