const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      interest: req.body.interest,
      role: req.body.role,
      address: req.body.address,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          status: "success",
          message: "User created successfully",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: "failed",
          message: "Invalid authenticaton credentials!",
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          status: "failed",
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "test",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        accessToken: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        user: fetchedUser,
        status: "success",
        message: "user logged in successfully",
      });
    })
    .catch((err) => {
      return res.status(401).json({
        status: "failed",
        message: "Invalid authentication credentials",
      });
    });
};
exports.updateUser = (req, res, next) => {
  let fetchedUser;
  var user = req.body;
  var userId = req.params.id;
  User.findByIdAndUpdate(userId, user, (err, updatedUser) => {
    if (err) res.status(500).json({ status: "failed" });
    res.status(200).json({
      status: "success",
      message: "User Information updated successfully",
      profile: user,
    });
  });
};
exports.getUser = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) res.status(500).json({ status: "failed" });
    res.status(200).json({
      status: "success",
      profile: user,
    });
  });
};
exports.getUsers = (req, res, next) => {
  User.find((err, users) => {
    if (err) res.status(500).json({ status: "failed" });
    res.status(200).json({
      status: "success",
      users: user,
    });
  });
};
exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err, employee) => {
    if (err) res.status(500).json({ status: "failed" });
    res.status(200).json({
      status: "success",
      message: "User Information deleted successfully",
      user: employee,
    });
  });
};
