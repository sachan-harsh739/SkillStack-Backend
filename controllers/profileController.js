const User = require("../models/userModel");

// ================================
// GET PROFILE
// ================================
const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: [
                "id",
                "name",
                "email",
                "university",
                "graduationYear",
                "linkedinUrl",
                "githubUrl",
                "portfolioUrl",
            ],
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("Get profile error:", error);

        res.status(500).json({
            message: "Failed to fetch profile",
            error: error.message,
        });
    }
};


// ================================
// UPDATE PROFILE
// ================================
const updateProfile = async (req, res) => {
    try {
        const {
            name,
            email,
            university,
            graduationYear,
            linkedinUrl,
            githubUrl,
            portfolioUrl,
        } = req.body;

        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Name
        if (name !== undefined) {
            user.name = name
                .trim()
                .toLowerCase()
                .split(/\s+/)
                .map(
                    (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");
        }

        // Email
        if (email !== undefined) {
            user.email = email.trim().toLowerCase();
        }

        // Other profile fields
        if (university !== undefined) {
            user.university = university;
        }

        if (graduationYear !== undefined) {
            user.graduationYear = graduationYear;
        }

        if (linkedinUrl !== undefined) {
            user.linkedinUrl = linkedinUrl;
        }

        if (githubUrl !== undefined) {
            user.githubUrl = githubUrl;
        }

        if (portfolioUrl !== undefined) {
            user.portfolioUrl = portfolioUrl;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                university: user.university,
                graduationYear: user.graduationYear,
                linkedinUrl: user.linkedinUrl,
                githubUrl: user.githubUrl,
                portfolioUrl: user.portfolioUrl,
            },
        });

    } catch (error) {
        console.error("Update profile error:", error);

        res.status(500).json({
            message: "Failed to update profile",
            error: error.message,
        });
    }
};


module.exports = {
    getProfile,
    updateProfile,
};
