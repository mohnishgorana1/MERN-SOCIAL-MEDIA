import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchAll",
  async (page) => {
    const { data } = await api.fetchPosts(page);
    return data;
  }
);

export const getPostBySearchAsync = createAsyncThunk(
  "posts/searchPost",
  async (searchQuery) => {
    console.log("searchQuery", searchQuery);
    const {
      data: { data },
    } = await api.searchPost(searchQuery);

    // console.log("data : ", data);
    return data;
  }
);

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
  async (id, post) => {
    const { data } = await api.updatePost(id, post);
    console.log(data);
    return data;
  }
);

export const likePostAsync = createAsyncThunk("posts/like", async (id) => {
  console.log("ID  for like of post", id);
  const { data } = await api.likePost(id);
  return data;
});

export const deletePostsAsync = createAsyncThunk("posts/delete", async (id) => {
  const { data } = await api.deletePost(id);
  console.log(`Post with id ${id} deleted Successfully`);
  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: [], // array for storing posts in redux
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          posts: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      })
      .addCase(getPostBySearchAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          posts: action.payload
        }
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
        console.log(`Post liked`, action.payload);
      })
      .addCase(deletePostsAsync.fulfilled, (state, action) => {
        return state.filter((post) => post._id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
