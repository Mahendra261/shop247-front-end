const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    console.log(hash);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      phoneNumber: req.body.phoneNumber,
      interests: req.body.interests,
      role: req.body.role,
      address: req.body.address
    });
    user
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Invalid authenticaton credentials!"
        });
      });
  });
}


exports.userLogin = (req, res, next) => {
  let fetchedUser;
  // console.log(req.body.email);
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;

      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      // console.log('result:' + JSON.stringify(result));
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        // process.env.JWT_KEY,
        'secretKey',
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      // return res.status(401).json({
      //   message: "Invalid authentication credentials"
      // });
      console.log('error' + err);
    });
}

exports.updateUser = (req, res, next) => {
  let fetchedUser;
  var user = req.body;
  var userId = req.params.id;
  User.updateOne({ _id: userId }, user)
    .then(result => {
      console.log("result" + result);
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      }
      res.status(401).json({ message: "Cannot Update other's post" });

    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update address!"
      });
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

