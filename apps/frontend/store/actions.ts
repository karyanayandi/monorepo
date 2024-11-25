import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebaseConfig from "@repo/firebase-config";
import { HTTP_STATUS, Login, User } from "@repo/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { ResponseDT } from "@/models/responseModel";
import { fetchUserData, setAuthToken, updateUserData } from "@/apis/userApi";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Failed to set auth persistence:", error);
});

export const loginUser = createAsyncThunk<{}, Login, { rejectValue: string }>(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);

      const authToken = await data.user.getIdToken();

      setAuthToken(authToken);

      return data.user;
    } catch (error: any) {
      const errorMessage = error.message || "Login failed. Please try again.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: any }>(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      const errorMessage = error.message || "Logout failed. Please try again.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const fetchUser = createAsyncThunk<
  ResponseDT<null>,
  { userId: string },
  { rejectValue: any }
>("user/fetch", async ({ userId }, thunkAPI) => {
  try {
    const response = await fetchUserData(userId);

    if (response.status == HTTP_STATUS.ERROR) {
      throw response.message;
    }

    const { data } = response;

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk<
  ResponseDT<null>,
  { userId: string; data: User },
  { rejectValue: any }
>("user/update", async ({ userId, data }, thunkAPI) => {
  try {
    const response: ResponseDT<null> = await updateUserData(userId, data);

    if (response.status == HTTP_STATUS.ERROR) {
      throw response.message;
    }

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
