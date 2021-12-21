const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  console.log("hi");
  //   res.status(201).json({
  //     message: "User created!",
  //   });
  //   firstName: { type: String },
  //   lastName: { type: String },
  //   phoneNumber: (number = 0),
  //   email: { type: String, required: true, unique: true },
  //   password: { type: String, required: true },
  //   interest: { type: String },
  //   role: { type: String },
  //   address: { type: String },
  bcrypt.hash(req.body.password, 10).then((hash) => {
    console.log(hash);
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
        console.log(result);
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Invalid authenticaton credentials!",
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  console.log("process.env.JWT_KEY", process.env.JWT_KEY);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "test",
        //process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        user: fetchedUser,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentication credentials",
      });
    });
};
exports.updateUser = (req, res, next) => {
  let fetchedUser;
  var user = req.body;
  var userId = req.params.id;
  User.findByIdAndUpdate(userId, user, (err, updatedUser) => {
    if (err) throw err;
    res.send(user);
  });
};
exports.getUser = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) throw err;
    res.send(user);
    //res.render("Employee-Detail", { employee: employee });
  });
};
exports.getUsers = (req, res, next) => {
  User.find((err, users) => {
    if (err) throw err;
    // res.render("employees", { employees: employees });
    res.send(users);
  });
};
exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err, employee) => {
    if (err) throw err;
    res.send(employee);
  });
};
