import axios from "axios";

const url = "/api/post";

const token = JSON.parse(localStorage.getItem("token"));
console.log("token", token);
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

console.log("config::", config);

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost, config);

export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost, config);

export const deletePost = (id) => axios.delete(`${url}/${id}`, config);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`, config);
