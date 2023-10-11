import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import { postsReducer } from "./reducer";

const rootReducer = combineReducers({ postsReducer })

export const Store = createStore(rootReducer, applyMiddleware(thunk))