import { configureStore } from "@reduxjs/toolkit";
import studentManagementApi from ".";


export const store = configureStore({
    reducer: {
        [studentManagementApi.reducerPath]: studentManagementApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(studentManagementApi.middleware),
});
