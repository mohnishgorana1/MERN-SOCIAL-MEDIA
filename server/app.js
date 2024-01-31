import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middlewares:  express.json | cors | cookieParser | morgan |
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// default route
app.use("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PONG",
  });
});



export default app;
