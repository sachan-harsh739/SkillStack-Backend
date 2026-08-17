const express = require("express");

const {
    loginUser,
    adminLogin,
} = require("../controllers/authController");

const router = express.Router();

// ==========================================
// NORMAL LOGIN
// ==========================================

router.post(
    "/login",
    loginUser
);


// ==========================================
// ADMIN LOGIN
// ==========================================

router.post(
    "/admin-login",
    adminLogin
);


module.exports = router;