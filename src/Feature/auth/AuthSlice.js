import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        // userId: null,
        // token: null,
        // auth: null,
        user: [],
        whale: false,
    },
    reducers: {
        setCredentials: (state, {payload}) => {
        //    const { userId, accessToken, auth } = payload;
           state.user = payload;
        //    state.token = accessToken;
        //    state.auth = auth;
           localStorage.setItem('user', JSON.stringify(state.user));
 
        },
        recupUser: (state, {payload}) => {
            if(payload){
                state.user = payload;
            }else{
                state.user = [];
            }
        },
        logOutt: (state, {payload}) => {
            state.user = [];
            // localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.removeItem('user');
            // localStorage.removeItem('badge');
        },
        decc: (state, {payload})=>{
            state.whale = payload;
        }
    } 
});

export const {setCredentials, logOutt, recupUser, decc} = AuthSlice.actions;
export default AuthSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;