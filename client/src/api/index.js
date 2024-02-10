import axios from "axios";

const url = "/api/post";

// const token = localStorage.getItem("token");
const token = JSON.parse(localStorage.getItem("token"));

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

console.log("token", token);

export const fetchPosts = (page) => axios.get(`${url}?page=${page}`);

export const searchPost = (searchQuery) =>
  axios.get(
    `${url}/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`
  );

export const createPost = (newPost) => axios.post(url, newPost, config);

export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost, config);

export const deletePost = (id) => axios.delete(`${url}/${id}`, config);

export const likePost = (id) =>
  axios.patch(`${url}/${id}/likePost`, {}, config);
