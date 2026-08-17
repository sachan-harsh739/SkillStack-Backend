const express = require("express");

const {
  getLeetCode,
  addLeetCode,
  updateLeetCode,
  deleteLeetCode,
} = require("../controllers/leetcodeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get LeetCode profile
router.get(
  "/",
  authMiddleware,
  getLeetCode
);

// Add LeetCode profile
router.post(
  "/",
  authMiddleware,
  addLeetCode
);

// Update LeetCode profile
router.put(
  "/:id",
  authMiddleware,
  updateLeetCode
);

// Delete LeetCode profile
router.delete(
  "/:id",
  authMiddleware,
  deleteLeetCode
);

module.exports = router;
