import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

export const getPosts = async (req, res) => {
  try {
    const post = await Post.find();
    console.log(post);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ Message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ Message: error.message });
  }
};

export const getPost = async (req, res) => {};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that post id");

  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });

  res.json(updatePost);
};

export const deletePost = async (req, res) => {};

export const likePost = async (req, res) => {};
