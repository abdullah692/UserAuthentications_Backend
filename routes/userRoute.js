const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  currentUser,
} = require("../Controller/userController");
const  validateToken  = require("../middleware/verifyTokenHandle");

const router = express.Router();

router.route("/").get(getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/current").get(validateToken, currentUser);

module.exports = router;
