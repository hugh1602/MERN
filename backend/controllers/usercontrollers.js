const asynchandler = require("express-async-handler");
const generatetoken = require("../config/generatetoken");
const User = require("../models/usermodel");

const registeruser = asynchandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all the required fields");
  }

  const userexists = await User.findOne({ email });
  if (userexists) {
    res.status(400);
    throw new Error("Email(user) already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generatetoken(user._id),
    });
  } else {
    throw new Error("Failed to create user");
  }
});

const authuser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchpassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generatetoken(user._id),
    });
  } else {
    throw new Error("Invalid email or password");
  }
});

const allUsers = asynchandler(async (req, res) => {
  //Do a search by the given context, in this case name and email
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  //Search in the keyworld EXCEPT this user
  const users = await await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

module.exports = { registeruser, authuser, allUsers };
