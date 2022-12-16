import { createSlice } from "@reduxjs/toolkit";

export const commandeSlice = createSlice({
    name: "commande",
    initialState: {
        commande: [],
        commandeart: [],
    },
    reducers: {
        recupCommande: (state, {payload}) => {
            if(payload){
                state.commande = payload; 
                state.commande = state.commande.sort(function (a, b) {
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

        recupCommandeart: (state, {payload}) => {
          if(payload){
              state.commandeart = payload; 
              state.commandeart = state.commandeart.sort(function (a, b) {
                  var key1 = new Date(a.command_date);
                  var key2 = new Date(b.command_date);
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

export const {recupCommande , recupCommandeart} = commandeSlice.actions;
export default commandeSlice.reducer;