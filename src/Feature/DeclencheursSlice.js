import { createSlice } from "@reduxjs/toolkit";

export const declencheurSlice = createSlice({
    name: "triggers",
    initialState: {
        triggermod: false
    },
    reducers: {
        dectriggmod: (state, { payload }) => {
            state.triggermod = payload;
        },
    }
});

export const {dectriggmod} = declencheurSlice.actions;
export default declencheurSlice.reducer;