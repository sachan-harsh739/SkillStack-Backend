const express = require("express");

const adminMiddleware = require("../middleware/adminMiddleware");
const { updateProfile } = require("../controllers/userController");

const router = express.Router();

// ==========================================
// ADMIN DASHBOARD TEST
// ==========================================

router.get(
    "/dashboard",
    adminMiddleware,
    (req, res) => {
        res.status(200).json({
            message: "Welcome to SkillStack Admin Dashboard",
            admin: {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role,
            },
        });
    }
);

// ==========================================
// UPDATE PROFILE (GITHUB / LINKEDIN)
// ==========================================

router.put(
    "/profile",
    adminMiddleware,
    updateProfile
);

module.exports = router;
