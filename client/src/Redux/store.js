import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postSlice.js";
import authReducer from "./authSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export default store;
