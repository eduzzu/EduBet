import { createSlice} from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    name: string,
    username: string,
    email: string,
    password?: string,
    cnp: string,
    address: string,
    county: string,
    town: string,
    phoneNumber: string,
    profilePicture?: string,
    accountBalance: number,
    verifiedDocuments: boolean,
    isAdmin: boolean,
    bettingTickets: string[]
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
    },
  },
});

export const { setLogin, setLogout} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
