const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const http = require("http");
// const postRoutes = require('./routes/posts');

const userRoutes = require('./routes/user');
// app.use( function(req, res, next) {
//   if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
//     return res.sendStatus(204);
//   }
//   return next();
// });
// mongoose.connect("mongodb+srv://mahi:" +
//   process.env.MONGO_ATLAS_PW +
//   "@cluster0.l8oak.mongodb.net/node-angular")
mongoose.connect('mongodb://localhost:27017/shop247').then(() => {
  console.log('Connected to Database!');
})
  .catch(() => {
    console.log('Connection failed!');
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// app.use('/api/posts', postRoutes);
app.use('/user', userRoutes);
// http.createServer(app);
app.get("/", (req, res) => {
  res.send("hi");
  //res.render("index");
});
app.listen(3000, () => {
  console.log('listeneing at 3000')
})
