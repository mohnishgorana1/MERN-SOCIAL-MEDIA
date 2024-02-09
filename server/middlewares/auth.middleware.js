import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  console.log("req.headers.authorization >> ", req.headers.authorization);

  const token = req.headers.authorization.split(" ")[1];

  console.log("token", token);
  if (token) {
    try {
      const decode = jwt.verify(token, "test");
      console.log("decode", decode);
      req.userId = decode?.id;
      next();
    } catch (error) {
      res.status(401).json({ message: "Cannot verify token you provided" });
      console.log("AUTH ERROR: ", error);
    }
  } else {
    res.status(401).json({ message: "No token provided" });
    console.log("no token provided");
  }
};

export default auth;
