import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

export const fetchPostsAsync = createAsyncThunk("posts/fetchAll", async () => {
  const { data } = await api.fetchPosts();
  return data;
});

export const createPostAsync = createAsyncThunk(
  "posts/create",
  async (post) => {
    const { data } = await api.createPost(post);
    console.log(data);
    return data;
  }
);

export const updatePostAsync = createAsyncThunk(
  "posts/update",
  async ({ id, post }) => {
    const { data } = await api.updatePost(id, post);
    return data;
  }
);

export const likePostAsync = createAsyncThunk("posts/like", async (id) => {
  const { data } = await api.likePost();
  return data;
});

export const deletePostsAsync = createAsyncThunk("posts/delete", async (id) => {
  const { data } = await api.deletePost();
  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: [], // array for storing posts in redux
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        const index = state.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(likePostAsync.fulfilled, (state, action) => {
        const index = state.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deletePostsAsync.fulfilled, (state, action) => {
        return state.filter((post) => post._id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
