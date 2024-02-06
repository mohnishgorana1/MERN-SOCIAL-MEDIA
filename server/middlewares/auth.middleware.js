import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("")[1];

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, "test");

      req.userId = decoded?.id;
    }

    next();
  } catch (error) {
    console.log("Auth Middleware Error: ", error);
  }
};

export default auth;
