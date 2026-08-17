const express = require("express");

const {
    getProfile,
    updateProfile,
} = require("../controllers/profileController");

const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// ==========================================
// ADMIN PROFILE
// ==========================================

// Get profile for admin dashboard
router.get(
    "/",
    adminMiddleware,
    getProfile
);

// Update profile
router.put(
    "/",
    adminMiddleware,
    updateProfile
);

module.exports = router;

