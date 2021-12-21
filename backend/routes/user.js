const express = require("express");
const userController = require('../controllers/user')

const router = express.Router();

router.post("/signup", userController.createUser);

router.post("/login", userController.userLogin);

router.put("/:id", userController.updateUser);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);
router.get("/", userController.getUsers);

module.exports = router;
