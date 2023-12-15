import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
      state.error = "";
      state.status = "";
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice;
