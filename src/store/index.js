import { usersReducer } from "./slices/usersSlices";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export * from "./thunks/fetchUsers";
