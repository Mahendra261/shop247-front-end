const express = require("express");
const cartController = require("../controller/cart");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// router.put("/:id", checkAuth, productController.updateProduct);
// router.get("/:id", checkAuth, productController.getProduct);
// router.delete("/:id", productController.deleteProduct);
router.get("/", checkAuth, cartController.getCarts);
router.get("/:userId", checkAuth, cartController.getCartByUser);
// router.get("/homepage/banner", checkAuth, productController.getLatestProducts);
// router.get("/homepage/categories", checkAuth, productController.getCategories);
// router.get(
//   "/homepage/categories/:category",
//   checkAuth,
//   productController.getCategoryProducts
// );
router.post("/", checkAuth, cartController.createCart);
module.exports = router;
