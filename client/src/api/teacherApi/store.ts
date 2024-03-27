import { configureStore } from "@reduxjs/toolkit";
import teacherManagementApi from ".";

export const store = configureStore({
    reducer: {
        [teacherManagementApi.reducerPath]: teacherManagementApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(teacherManagementApi.middleware),
});
