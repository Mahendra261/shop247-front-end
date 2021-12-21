const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const postRoutes = require("./routes/posts");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
// app.use( function(req, res, next) {
//   if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
//     return res.sendStatus(204);
//   }
//   return next();
// });
mongoose
  .connect("mongodb://localhost:27017/projectdb")
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// app.use('/api/posts',postRoutes);
app.use("/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.get("/", (req, res) => {
  res.send("hi");
  //res.render("index");
});
// module.exports = app;
app.listen(3000, () => {
  console.log("listening on 3000");
});
