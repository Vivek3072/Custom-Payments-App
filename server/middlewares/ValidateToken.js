const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ErrorRespond = require("../helpers/ErrorRespond");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader) return ErrorRespond(res, 400, "Unauthorized Request!");

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return ErrorRespond(res, 401, "User is not authorized!");
      }
      //   console.log(decoded);
      req.user = decoded.user;
      next();
    });
    if (!token) {
      ErrorRespond(
        res,
        401,
        "User not authorized or token is missing in the request!"
      );
    }
  }
});

module.exports = validateToken;
