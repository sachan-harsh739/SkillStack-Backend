const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ["password"],
            },
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: {
                exclude: ["password"],
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user",
            error: error.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const {
    name,
    email,
    password,
    university,
    graduationYear,
    track,
} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
    name,
    email,
    password: hashedPassword,
    university,
    graduationYear,
    track,
});

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create user",
            error: error.message,
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const {
            githubUrl,
            linkedinUrl,
        } = req.body;

        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (githubUrl !== undefined) {
            user.githubUrl = githubUrl;
        }

        if (linkedinUrl !== undefined) {
            user.linkedinUrl = linkedinUrl;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user.id,
                name: user.name,
                githubUrl: user.githubUrl,
                linkedinUrl: user.linkedinUrl,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update profile",
            error: error.message,
        });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateProfile,
};