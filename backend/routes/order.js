const express = require("express");
const orderController = require("../controller/order");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.put("/:id", checkAuth, orderController.updateOrder);
router.get("/:id", checkAuth, orderController.getOrder);
router.delete("/:id", orderController.deleteOrder);
router.get("/", checkAuth, orderController.getOrders);
router.get("/:userId", checkAuth, orderController.getOrdersByUser);
router.post("/", checkAuth, orderController.createOrder);
module.exports = router;
