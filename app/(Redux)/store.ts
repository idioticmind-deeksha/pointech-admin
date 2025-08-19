import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk"; // ✅ correct import
import createNoopStorage from "../utils/noopStorage";
import { reducers } from "./Reducers/reducer";

const isServer = typeof window === "undefined";
const chosenStorage = isServer ? createNoopStorage() : storage;

const persistConfig = {
  key: "user",
  storage: chosenStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // thunk is already included by default
});

export const persistor = persistStore(store);
export default store;
