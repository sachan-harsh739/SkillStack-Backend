const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// ==========================================
// NORMAL LOGIN
// ==========================================

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN || "1d",
            }
        );

        res.status(200).json({
            message: "Login successful",

            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};


// ==========================================
// ADMIN LOGIN (HARDCODED)
// ==========================================

// Admin credentials come from .env (ADMIN_EMAIL / ADMIN_PASSWORD),
// not from the database.
// Must match PUBLIC_USER_ID in publicController / projectController
// so content saved by the admin shows on the public portfolio.
const ADMIN_USER_ID = 3;

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            return res.status(500).json({
                message: "Admin credentials are not configured",
            });
        }

        // ======================================
        // CHECK CREDENTIALS
        // ======================================

        if (
            email.trim().toLowerCase() !==
                process.env.ADMIN_EMAIL.toLowerCase() ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                message: "Invalid admin credentials",
            });
        }

        const user = {
            id: ADMIN_USER_ID,
            name: process.env.ADMIN_NAME || "Admin",
            email: process.env.ADMIN_EMAIL,
            role: "admin",
        };

        // ======================================
        // CREATE ADMIN JWT
        // ======================================

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: "admin",
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN || "1d",
            }
        );

        res.status(200).json({
            message: "Admin login successful",

            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Admin login error:", error);

        res.status(500).json({
            message: "Admin login failed",
            error: error.message,
        });
    }
};


module.exports = {
    loginUser,
    adminLogin,
};