import { createSlice } from "@reduxjs/toolkit";

export const approvisionSlice = createSlice({
    name: "approvision",
    initialState: {
        approvision: []
    },
    reducers: {
        recupApprovision: (state, {payload}) => {
            if(payload){
                state.approvision = payload; 
            }
        },
        setApprovision: (state, action) => {
            state.approvision = [...state.approvision, action.payload];
            localStorage.setItem("approvision", JSON.stringify(state.approvision));
        },
        deleteApprovision: (state, { payload }) => {
            state.approvision = state.approvision.filter((t) => t.product_id !== payload);
            localStorage.setItem("approvision", JSON.stringify(state.approvision));
        },
        updateApprovisionQuant: (state, { payload }) => {
            state.approvision = state.approvision.map((val) => {
                if (val.product_id === payload[1]) {
                    return {
                        ...val,
                        stock_appro: payload[0],
                        total_price: payload[2],
                    };
                } else {
                    return val;
                }
            });
            localStorage.setItem("approvision", JSON.stringify(state.approvision));
        },
        viderApprovision: (state, { payload }) => {
           
            state.approvision = [];
            localStorage.setItem("approvision", JSON.stringify(state.approvision));
        
    },
    }
});

export const {recupApprovision, setApprovision, deleteApprovision, updateApprovisionQuant, viderApprovision } = approvisionSlice.actions;
export default approvisionSlice.reducer;