import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import storage from "redux-persist/lib/storage"
// storage mean save user data when browser off
// sessionStorge data remove when user close browser

import {persistReducer,persistStore} from "redux-persist"
import createFilter from "redux-persist-transform-filter"

// saveUserFilter
const saveUserOnly = createFilter("user",["user"])

// persist config
const persistConfig = {
    key:'user',
    storage,
    whitelist:["user"],
    transforms:[saveUserOnly]
}

const rootReducer = combineReducers({
    user:userSlice.reducer
});
const perReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer: perReducer,
  middleware:(getDefaultMiddleware)=>{
    getDefaultMiddleware({
        serializableCheck:false
    })
  },
  devTools: true,
});

export const perStore = persistStore(store)