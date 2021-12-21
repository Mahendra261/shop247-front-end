const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "test");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    console.log(req.userData);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "You're not Authnticated" });
  }
};
