import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
export const getPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ Message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({ ...post, creator: req.userId });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ Message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  // const { title, message, creator, selectedFile, tags } = req.body;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = post

  await Post.findByIdAndUpdate(id, updatedPost, { new: true });
  console.log("postUpdated");
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndDelete(id);
  res.json({ message: "Post Deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  console.log("USER ID THAT IS LIKING POST:: ", req.userId);
  if (!req.userId) {
    return res.json({ message: "Not Authorized" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like post
    post.likes.push(req.userId);
    console.log("POST LIKED");
  } else {
    // dislike post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
    console.log("POST DISLIKED");

  }
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  res.json({ message: "Post Like Update Successfully" });
};
