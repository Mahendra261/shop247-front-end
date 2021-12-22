const express = require("express");
const userController = require("../controller/user");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.userLogin);
router.put("/:id", checkAuth, userController.updateUser);
router.get("/:id", checkAuth, userController.getUser);
router.delete("/:id", userController.deleteUser);
router.get("/", checkAuth, userController.getUsers);
module.exports = router;
