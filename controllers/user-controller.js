const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const mailChecker = require("../helper/mailcheck");
const { validationResult } = require("express-validator");
const config = require("config");
const user = require("../models/user");

//User Sign in Controller
const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, username } = req.body;
  let valid = true;
  try {
    if (mailChecker(email) === false) {
      valid = false;
    }
  } catch (err) {
    return res
      .status(400)
      .json({ errors: [{ msg: "enter vaild alliance mail id " }] });
  }
  if (valid === false) {
    return res
      .status(400)
      .json({ errors: [{ msg: "enter vaild alliance mail id" }] });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
  } catch (err) {
    return res
      .status(400)
      .json({ errors: [{ msg: "signing up failed ,please try again" }] });
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ errors: [{ msg: "user already exists, please login" }] });
  }
  let hashedPassword;
  try {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  } catch (err) {
    return res
      .status(422)
      .json({ errors: [{ msg: "signing up failed, please try again" }] });
  }
  const profileImages = [
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic1_jay2ch.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic2_uufmdu.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635407/Alliance%20chat/pic3_x0kjks.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic4_vty8zj.jpg",
    "https://res.cloudinary.com/varunnrk/image/upload/v1617635408/Alliance%20chat/pic5_dxjeha.jpg",
  ];
  const RandomNo = Math.floor(Math.random() * 5);
  const createdUser = new User({
    name,
    email,
    username,
    img: profileImages[RandomNo],
    password: hashedPassword,
    cover: null,
    publicId: null,
  });
  try {
    await createdUser.save();
    // res.send(createdUser);
    const payload = {
      user: {
        id: createdUser.id,
      },
    };
    try {
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // console.log(err.message);
      res.status(500).json({ errors: [{ msg: "server error" }] });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ errors: [{ msg: "signing up failed, please try again" }] });
  }
};
const Login = async (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Login failed please try again" }] });
  }
  if (!existingUser) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Email does not exist please login" }] });
  }
  let validPassword;
  try {
    validPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Invalid credentials, could not log in" }] });
  }
  if (!validPassword) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Invalid credentials, could not log in" }] });
  }
  const payload = {
    user: {
      id: existingUser.id,
    },
  };
  jwt.sign(
    payload,
    config.get("jwtsecret"),
    { expiresIn: 36000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};
const getUser = async (req, res) => {
  const uid = req.params.id;
  // console.log(req.query.skip);
  if (req.query.skip === undefined) {
    let user;
    try {
      user = await User.findById(uid, "-password");
    } catch (err) {
      console.log(err.message);
      return res
        .status(500)
        .json({ errors: [{ msg: "An errror occured, please try again" }] });
    }
    if (!user) {
      res.status(500).json({ errors: [{ msg: "User not found" }] });
    }
    res.json(user);
  } else {
  }
};

const getUsers = async (req, res) => {
  const { q, skip, limit, id } = req.query;
  let users, length;
  if (limit) {
    try {
      users = await User.find({
        username: { $regex: q },
        _id: { $ne: id },
      })
        .select("username _id")
        .limit(7);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        errros: [{ msg: "Fetching users failed, please try again" }],
      });
    }
    res.json({
      users: users.map((user) => {
        return {
          label: user.name,
          value: user._id,
        };
      }),
    });
  } else {
    try {
      length = await User.find(
        { username: { $regex: q } },
        "-password"
      ).countDocuments();
      users = await User.find({ username: { $regex: q } }, "-password")
        .skip(parseInt(skip))
        .limit(5);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        errors: [{ msg: "Fetching users failed, please try again" }],
      });
    }
    res.json({ users, length });
  }
};
const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({
      errors: [{ msg: "Invalid inputs, please check your Input" }],
    });
  }
  const { oldPassword, newPassword, confirmPassword } = req.body;
  id = req.params.id;
  if (newPassword !== confirmPassword) {
    return res.status(422).json({
      errors: [{ msg: "New password should be same as confirm password" }],
    });
  }
  let validPassword, newHashedPassword, user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return res
      .status(422)
      .json({ errors: [{ msg: "Something went wrong, please try again" }] });
  }
  if (!user) {
    return res
      .status(422)
      .json({ errors: [{ msg: "No such user, please try to sign in again" }] });
  }
  try {
    validPassword = await bcrypt.compare(oldPassword, user.password);
    const salt = await bcrypt.genSalt(10);
    newHashedPassword = await bcrypt.hash(newPassword, salt);
  } catch (err) {
    return res.status(422).json({ errors: [{ msg: "Server error" }] });
  }
  if (!validPassword) {
    return res.status(422).json({ errors: [{ msg: "Check your password" }] });
  }
  try {
    user.password = newHashedPassword;
    await user.save();
  } catch (err) {
    return status(422).json({ errors: [{ msg: "server error" }] });
  }
  res.json({ message: "success" });
};
module.exports = {
  signUp,
  Login,
  getUser,
  getUsers,
  changePassword,
};
