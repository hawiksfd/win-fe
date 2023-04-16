import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import jwt_decoded from "jwt-decode";

import { api, privateApi } from "../services/setupInterceptor";

export const register = createAsyncThunk(
  "register",
  async ({ name, email, password, gender }) => {
    try {
      var respRegis = await api.post("auth/register", {
        name,
        email,
        password,
        gender,
      });
      return respRegis.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk("login", async ({ email, password }) => {
  try {
    var resLogin = await api.post("auth/login", {
      email,
      password,
    });
    const datas = resLogin.data;
    const decoded = jwt_decoded(datas.accessToken);
    const expire = decoded.exp;
    localStorage.setItem("tkn", JSON.stringify(datas.accessToken));
    localStorage.setItem("exp", JSON.stringify(expire));
    let resp = { datas, expire };
    return resp;
  } catch (error) {
    console.log(error);
  }
});

export const logout = createAsyncThunk("logout", async (dispatch) => {
  try {
    var respLogout = await privateApi.delete("auth/logout");
    localStorage.removeItem("tkn");
    localStorage.removeItem("exp");
  } catch (error) {
    console.log(error);
  }
});

export const getUser = createAsyncThunk("USERS", async (id) => {
  const respGetUser = await privateApi.get(`auth/user/${id}`);
  return respGetUser;
});

const initialState = {
  user: [],
  uid: null,
  msg: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.uid = action.payload.datas.id;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.uid = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

const persistConfig = {
  key: "auth",
  storage,
};

export default persistReducer(persistConfig, authSlice.reducer);
