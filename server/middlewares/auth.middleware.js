import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// const auth = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // token = req.headers.authorization.split(" ")[1];
//       token = req.headers.authorization;
//       console.log("req.headers:  ", req.headers.authorization);
//       console.log("token:: ", token);
//       // const myToken = token.substring(1, token.length - 1);
//       // console.log("myToken:: ", myToken);

//       const decoded = jwt.verify(token, "test");

//       console.log(decoded);

//       req.userId = decoded?.id;

//       next();
//     } catch (error) {
//       console.log("Auth Middleware Error: ", error);
//       res.status(401).json({ message: "Token is invalid!" });
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// };

const auth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    try {
      const decode = jwt.verify(token, "test");
      console.log(decode);
      req.userId = decode?.id;
    } catch (error) {
      res.status(401).json({ message: "No token provided" });
      console.log("AUTH ERROR: ", error);
    }
    next();
  } else {
    res
      .status(401)
      .json({ message: "Cant get Configuration for Authorization" });
    console.log("No Authorization token provided");
  }
};

export default auth;
