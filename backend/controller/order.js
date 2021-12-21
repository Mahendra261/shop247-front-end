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
// exports.getOrders = (req, res, next) => {
//   const orderQuery = Order.find();
//   let fetchedOrder;
//   let cart = [];
//   orderQuery
//     .then((documents) => {
//       fetchedOrder = documents;
//       for (let i = 0; i < fetchedOrder.length; i++) {
//         Cart.findById(fetchedOrder[i].cartId, (err, product) => {
//           if (err) res.status(401).json({ status: "failed - cart" });
//           cart = product;
//         });
//         fetchedOrder[i].cart = cart;
//       }
//       //   Cart.findById(documents.cartId, (err, product) => {
//       //     if (err) res.status(401).json({ status: "failed - cart" });
//       //     cart = product;
//       //     // for(let i =0;i<product)
//       //     // res.status(200).json({ status: "success", product: product });
//       //     //res.render("Employee-Detail", { employee: employee });
//       //   });
//       //   fetchedOrder = {
//       //     ...fetchedOrder,
//       //     cart: cart,
//       //   };
//       return Order.count();
//     })
//     .then((count) => {
//       res.status(200).json({
//         status: "success",
//         orders: fetchedOrder,
//         maxSize: count,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         status: "failed",
//       });
//     });
// };
exports.getOrders = (req, res, next) => {
  const orderQuery = Order.find();
  let fetchedOrder;
  let cart = [];
  orderQuery
    .then((documents) => {
      fetchedOrder = documents;
      // for (let i = 0; i < fetchedOrder.length; i++) {
      //   Cart.findById(fetchedOrder[i].cartId, (err, product) => {
      //     if (err) res.status(401).json({ status: "failed - cart" });
      //     cart = product;
      //   });
      //   fetchedOrder[i].cart = cart;
      // }
      //   Cart.findById(documents.cartId, (err, product) => {
      //     if (err) res.status(401).json({ status: "failed - cart" });
      //     cart = product;
      //     // for(let i =0;i<product)
      //     // res.status(200).json({ status: "success", product: product });
      //     //res.render("Employee-Detail", { employee: employee });
      //   });
      //   fetchedOrder = {
      //     ...fetchedOrder,
      //     cart: cart,
      //   };
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
// exports.createOrder = (req, res, next) => {
//   //const url = req.protocol + "://" + req.get("host");

//   const order = new Order({
//     isDelivered: req.body.isDelivered,
//     orderDeliveredOn: req.body.orderDeliveredOn,
//     creator: req.userData.userId,
//     cartId: req.body.cartId,
//   });
//   order
//     .save()
//     .then((createdOrder) => {
//       Cart.findByIdAndDelete(req.body.cartId, (err, cartId) => {
//         if (err) throw err;
//         res.send(cartId);
//       });
//       res.status(201).json({
//         status: "success",
//         order: createdOrder,
//         // post: {
//         //   ...createdProduct,
//         //   id: createdProduct._id,
//         // },
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         status: "failed",
//       });
//     });
// };
exports.createOrder = (req, res, next) => {
  //const url = req.protocol + "://" + req.get("host");

  const order = new Order({
    isDelivered: req.body.isDelivered,
    orderDeliveredOn: req.body.orderDeliveredOn,
    creator: req.userData.userId,
    cart: req.body.cart,
  });
  order
    .save()
    .then((createdOrder) => {
      // Cart.findByIdAndDelete(req.body.cartId, (err, cartId) => {
      //   if (err) throw err;
      //   res.send(cartId);
      // });
      res.status(201).json({
        status: "success",
        order: createdOrder,
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
