const express = require("express");
const {
  registeruser,
  authuser,
  allUsers,
} = require("../controllers/usercontrollers");
const { protect } = require("../middlewares/authMiddle");

const router = express.Router();

router.route("/").post(registeruser).get(protect, allUsers);
router.post("/login", authuser);

module.exports = router;
