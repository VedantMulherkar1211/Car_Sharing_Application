import { createSlice } from "@reduxjs/toolkit";

//application state - logged in status
export const loggedSlice = createSlice({
    name: "logged",
    initialState: {
        loggedIn: false
    },
    reducers : {
        login: (state)=> { return {loggedIn: true}},

        logout: (state) => { return {loggedIn: false}}
    }
})
//component actions - useDispatch
export const {login,logout} = loggedSlice.actions
//will be used in store
export default loggedSlice.reducer;
