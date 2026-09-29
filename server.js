const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, sequelize } = require("./config/db");

// ==========================================
// MODELS
// ==========================================

require("./models/userModel");
require("./models/projectModel");
require("./models/educationModel");
require("./models/certificationModel");
require("./models/leetcodeModel");

// ==========================================
// ROUTES
// ==========================================

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const projectRoutes = require("./routes/projectRoutes");
const adminRoutes = require("./routes/adminRoutes");
const educationRoutes = require("./routes/educationRoutes");
const certificationRoutes = require("./routes/certificationRoutes");
const leetcodeRoutes = require("./routes/leetcodeRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
    res.json({
        message: "SkillStack Backend is running 🚀",
    });
});

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/expertise", projectRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/education", educationRoutes);


app.use(
    "/api/certifications",
    certificationRoutes
);

app.use(
    "/api/leetcode",
    leetcodeRoutes
);
app.use("/api/public", publicRoutes);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        await connectDB();

        await sequelize.sync();

        console.log(
            "Database tables synchronized ✅"
        );

        app.listen(PORT, () => {
            console.log(
                `Server running on http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "Server failed to start ❌"
        );

        console.error(error.message);
    }
};

startServer();
