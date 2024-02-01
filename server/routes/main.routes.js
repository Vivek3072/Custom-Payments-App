const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/UserController");

/**
 * @description
 * This is for first time users to let them signup
 */
router.post("/register", registerUser);

/**
 * @description
 * This route is for logging the user in
 */
router.post("/login", loginUser);

module.exports = router;
