/* haf to import dotenv or SALT returns undefined!! */
const dotenv = require("dotenv");
dotenv.config();
const { SALT } = process.env;
const jwt = require("jsonwebtoken");

const verifyToken = () => async (req, res, next) => {
  try {
    const authToken = req.header("Authorization").replace("Bearer ", "");
    /* 
    1. if verified, function below will return the payload, otherwise it will throw an error
    */
    jwt.verify(authToken, SALT);
    next();
  } catch (err) {
    err.msg = "you have not logged in, sir";
    return res.status(403).json({ err });
  }
};

module.exports = verifyToken;
