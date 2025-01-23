const UserController = require("../controllers/userController");

const router = require("express").Router();
//Getallusers
router.get("/", UserController.getAllUser);

module.exports = router;
