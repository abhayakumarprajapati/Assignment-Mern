
import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';


import thunk from "redux-thunk"



import { profileReducer, userReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";

console.log('debugging  store 1')

const reducer = combineReducers({
   
    user: userReducer,
    profile: profileReducer,
    

    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
   


});


let initialState = {}



const middleware = [thunk];


const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== "production" // Enables Redux DevTools in development mode
});

export default store;


