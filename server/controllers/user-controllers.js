const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const asyncHandler = require("express-async-handler");
// create user
// POST api/user/
const createUser = asyncHandler(async (req, res) => {
  try {
    const { fullName,username, password } = req.body;
    // check if username and password are empty
    if (!fullName || !username || !password) {
      res.status(400);
      throw new Error("All fields must not be empty..");
    }

    // check if the user is already exists
    const userExists = await User.findOne({ username: username });
    if (userExists) {
      res.status(400);
      throw new Error("Username already exists. Please try again");
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await User.create({ fullName,username, password: hashedPassword });
    if (user) {
      res.status(201).json({
        _id: user.id,
        fullName:user.fullName,
        username: user.username,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Authenticate user
// POST api/users/login
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if username and password are empty
    if (!username || !password) {
      res.status(400);
      throw new Error("all fields must not be empty");
    }

    // check if username exists
    const user = await User.findOne({ username: username });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        res.status(201).json({
          _id: user._id,
          fullName: user.fullName,
          token: generateToken(user._id)
        });
      } else {
        res.status(400);
        throw new Error("Invalid password");
      }
    } else {
      res.status(404);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get user
// GET api/users/me
// private
const getMe = asyncHandler(async (req, res) => {
  try {
    const { _id,fullName,username, password} = await User.findById(req.user.id);
    res.status(200).json({
      _id,
      fullName,
      username,
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// generate token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:'3d'});
}
module.exports = { createUser, loginUser, getMe };
