import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import postRoutes from './routes/post.routes.js'

const app = express();

// middlewares:  express.json | cors | cookieParser | morgan |
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

// default route
app.use("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PONG",
  });
});

// routes
app.use('api/post', postRoutes)



export default app;
