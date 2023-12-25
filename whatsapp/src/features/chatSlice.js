import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

const initialState = {
  status: "",
  error: "",
  conversation: [],
  activeConversation: {},
  messages: [],
  noifications: [],
  files: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, actions) => {
      state.activeConversation = actions.payload;
    },
  },
});
export const {setActiveConversation} = chatSlice.actions
export default chatSlice.reducer;
