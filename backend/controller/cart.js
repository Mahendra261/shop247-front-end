const jwt = require("jsonwebtoken");

const Cart = require("../models/cart");

exports.getCartByUser = (req, res, next) => {
  const cartQuery = Cart.find();
  const userId = req.params.userId;
  var userCart = [];
  let fetchedCart;
  cartQuery
    .then((documents) => {
      fetchedCart = documents;
      for (let i = 0; i < fetchedCart.length; i++) {
        if (fetchedCart[i].creator == userId) userCart.push(fetchedCart[i]);
      }
      return Cart.count();
    })
    .then((count) => {
      res.status(200).json({
        status: "success",
        cart: userCart,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
      });
    });
};
exports.getCarts = (req, res, next) => {
  const cartQuery = Cart.find();
  let fetchedCart;
  cartQuery
    .then((documents) => {
      fetchedCart = documents;
      // return Cart.count();
    })
    .then(() => {
      res.status(200).json({
        status: "success",
        cart: fetchedCart,
        //   maxSize: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
      });
    });
};

exports.createCart = (req, res, next) => {
  //const url = req.protocol + "://" + req.get("host");

  const cart = new Cart({
    productId: req.body.productId,
    quantity: req.body.quantity,
    creator: req.userData.userId,
  });
  cart
    .save()
    .then((createdCart) => {
      res.status(201).json({
        status: "success",
        cart: createdCart,
        // post: {
        //   ...createdProduct,
        //   id: createdProduct._id,
        // },
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
      });
    });
};
