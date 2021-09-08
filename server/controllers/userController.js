import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
//

// @desc Auth user & send token
// @route /api/users/login
// @access Public

const authUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwtToken,
    });
  });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = (req, res) => {
  User.findById(req.user._id).exec((err, user) => {
    if (err) {
      res.status(401).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  });
};

export { authUser, getUserProfile };
