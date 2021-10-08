import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

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
      expiresIn: "30d",
    });

    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwtToken,
      ps: user.password,
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
      return res.status(404).json({ message: "User Not found." });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  });
};

// @desc Register a new user
// @route /api/users
// @access Public

const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({
    email,
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message:
            "A user with the provided email already exists. Please try another.",
        });
      } else {
        User.create({
          name,
          email,
          password,
        }).then((user) => {
          var jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d", // 24 hours
          });

          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: jwtToken,
          });
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({ message: err.message });
    });
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

// const updateUserProfile = (req, res) => {
//   User.findById(req.user._id).exec((err, user) => {
//     if (err) {
//       res.status(401).send({ message: err });
//       return;
//     }

//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       // if (req.body.password && req.body.password !== "") {
//       //   user.password = req.body.password;
//       // }

//       user.save().then((updatedUser) => {
//         var jwtToken = jwt.sign(
//           { id: updatedUser._id },
//           process.env.JWT_SECRET,
//           {
//             expiresIn: 86400, // 24 hours
//           }
//         );
//         res.status(200).send({
//           _id: updatedUser._id,
//           name: updatedUser.name,
//           email: updatedUser.email,
//           isAdmin: updatedUser.isAdmin,
//           token: jwtToken,
//         });
//         if (err) {
//           return res
//             .status(404)
//             .json({ message: "Error updating user details." });
//         }
//       });
//     } else {
//       return res.status(404).json({ message: "User Not found." });
//     }
//   });
// };

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    // var jwtToken = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: "30d",
    // });
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      // token: jwtToken,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
