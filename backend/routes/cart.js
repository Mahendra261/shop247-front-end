const express = require("express");
const cartController = require("../controller/cart");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/", checkAuth, cartController.getCarts);
router.get("/:userId", checkAuth, cartController.getCartByUser);
router.post("/", checkAuth, cartController.createCart);
module.exports = router;
