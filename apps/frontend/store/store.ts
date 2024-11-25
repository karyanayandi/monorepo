import { configureStore } from "@reduxjs/toolkit";

import authReducer, { AuthState } from "./authSlice";
import userReducer, { UserState } from "./userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = {
  auth: AuthState;
  user: UserState;
};
export type AppDispatch = AppStore["dispatch"];
