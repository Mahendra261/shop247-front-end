const express = require("express");
const productController = require("../controller/product");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// router.post("/signup", userController.createUser);
// // router.get("/signup", userController.createUser);
// router.post("/login", userController.userLogin);
router.put("/:id", checkAuth, productController.updateProduct);
router.get("/:id", checkAuth, productController.getProduct);
router.delete("/:id", productController.deleteProduct);
// router.get("/", checkAuth, userController.getUsers);
router.get("/", checkAuth, productController.getProducts);
router.get("/homepage/banner", checkAuth, productController.getLatestProducts);
router.get("/homepage/categories", checkAuth, productController.getCategories);
router.get(
  "/homepage/categories/:category",
  checkAuth,
  productController.getCategoryProducts
);
router.post("/", checkAuth, productController.createProduct);
module.exports = router;
