const express = require("express");
const {
  accessChat,
  fetchChat,
  creatGroupChat,
  renameGroupChat,
  addMember,
  removeMember,
} = require("../controllers/chatControllers");
const { protect } = require("../middlewares/authMiddle");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, creatGroupChat);
router.route("/rename").put(protect, renameGroupChat);
router.route("/remove").put(protect, removeMember);
router.route("/add").put(protect, addMember);

module.exports = router;
