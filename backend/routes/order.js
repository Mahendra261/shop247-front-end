const express = require("express");
const orderController = require("../controller/order");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// router.put("/:id", checkAuth, productController.updateProduct);
// router.get("/:id", checkAuth, productController.getProduct);
// router.delete("/:id", productController.deleteProduct);
router.get("/", checkAuth, orderController.getOrders);
router.get("/:userId", checkAuth, orderController.getOrdersByUser);
// router.get("/homepage/banner", checkAuth, productController.getLatestProducts);
// router.get("/homepage/categories", checkAuth, productController.getCategories);
// router.get(
//   "/homepage/categories/:category",
//   checkAuth,
//   productController.getCategoryProducts
// );
router.post("/", checkAuth, orderController.createOrder);
module.exports = router;
