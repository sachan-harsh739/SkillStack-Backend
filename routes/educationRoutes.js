const express = require("express");

const {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/educationController");

const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// ==========================================
// ADMIN EDUCATION MANAGEMENT
// ==========================================

// Get education
router.get(
  "/",
  adminMiddleware,
  getEducation
);

// Add education
router.post(
  "/",
  adminMiddleware,
  addEducation
);

// Update education
router.put(
  "/:id",
  adminMiddleware,
  updateEducation
);

// Delete education
router.delete(
  "/:id",
  adminMiddleware,
  deleteEducation
);

module.exports = router;
