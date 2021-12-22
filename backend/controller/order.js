const jwt = require("jsonwebtoken");

const Order = require("../models/order");
const Cart = require("../models/cart");
exports.getOrdersByUser = (req, res, next) => {
  const orderQuery = Order.find();
  const userId = req.params.userId;
  var userOrder = [];
  let fetchedOrder;
  orderQuery
    .then((documents) => {
      fetchedOrder = documents;
      for (let i = 0; i < fetchedOrder.length; i++) {
        if (fetchedOrder[i].creator == userId) userOrder.push(fetchedOrder[i]);
      }
      return Order.count();
    })
    .then((count) => {
      res.status(200).json({
        status: "success",
        orders: userOrder,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
      });
    });
};

exports.getOrders = (req, res, next) => {
  const orderQuery = Order.find();
  let fetchedOrder;
  let cart = [];
  orderQuery
    .then((documents) => {
      fetchedOrder = documents;
      return Order.count();
    })
    .then((count) => {
      res.status(200).json({
        status: "success",
        orders: fetchedOrder,
        maxSize: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
      });
    });
};

exports.createOrder = (req, res, next) => {
  const order = new Order({
    isDelivered: req.body.isDelivered,
    orderDeliveredOn: req.body.orderDeliveredOn,
    creator: req.userData.userId,
    cart: req.body.cart,
  });
  order
    .save()
    .then((createdOrder) => {
      res.status(201).json({
        status: "success",
        order: createdOrder,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
      });
    });
};
exports.deleteOrder = (req, res, next) => {
  Order.findByIdAndDelete(req.params.id, (err, order) => {
    if (err) res.status(500).json({ status: "failed" });
    res.status(200).json({
      status: "success",
      message: "order deleted sucessfully",
      order: order,
    });
  });
};
exports.updateOrder = (req, res, next) => {
  const post = req.body;
  var orderId = req.params.id;
  Order.findByIdAndUpdate(orderId, post, (err, updatedOrder) => {
    if (err) res.status(500).json({ status: "failed" });
    res
      .status(200)
      .json({
        status: "success",
        message: "order modified sucessfully",
        order: updatedOrder,
      });
  });
};
exports.getOrder = (req, res, next) => {
  Order.findById(req.params.id, (err, order) => {
    if (err) res.status(500).json({ status: "failed" });
    res.status(200).json({ status: "success", order: order });
  });
};
