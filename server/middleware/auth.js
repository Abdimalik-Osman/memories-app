const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password');

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorized..");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, no token available");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { protect };
