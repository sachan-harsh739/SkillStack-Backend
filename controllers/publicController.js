const User = require("../models/userModel");
const Project = require("../models/projectModel");
const Education = require("../models/educationModel");
const Certification = require("../models/certificationModel");
const LeetCode = require("../models/leetcodeModel");

// ==========================================
// PUBLIC PORTFOLIO USER
// ==========================================

const PUBLIC_USER_ID = 3;


// ==========================================
// PUBLIC PROFILE
// ==========================================

const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: PUBLIC_USER_ID,
      },
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
        message: "Profile not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Public profile error:", error);

    res.status(500).json({
      message: "Failed to fetch public profile",
    });
  }
};


// ==========================================
// PUBLIC PROJECTS
// ==========================================

const getPublicProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        userId: PUBLIC_USER_ID,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(projects);

  } catch (error) {
    console.error("Public projects error:", error);

    res.status(500).json({
      message: "Failed to fetch public projects",
    });
  }
};


// ==========================================
// PUBLIC EDUCATION
// ==========================================

const getPublicEducation = async (req, res) => {
  try {
    const education = await Education.findAll({
      where: {
        userId: PUBLIC_USER_ID,
      },
      order: [["id", "DESC"]],
    });

    res.status(200).json(education);

  } catch (error) {
    console.error("Public education error:", error);

    res.status(500).json({
      message: "Failed to fetch public education",
    });
  }
};


// ==========================================
// PUBLIC CERTIFICATIONS
// ==========================================

const getPublicCertifications = async (req, res) => {
  try {
    const certifications = await Certification.findAll({
      where: {
        userId: PUBLIC_USER_ID,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(certifications);

  } catch (error) {
    console.error("Public certifications error:", error);

    res.status(500).json({
      message: "Failed to fetch public certifications",
    });
  }
};


// ==========================================
// PUBLIC LEETCODE
// ==========================================

const getPublicLeetCode = async (req, res) => {
  try {
    const profile = await LeetCode.findOne({
      where: {
        userId: PUBLIC_USER_ID,
      },
      attributes: [
        "id",
        "username",
        "profileUrl",
      ],
    });

    if (!profile) {
      return res.status(200).json(null);
    }

    res.status(200).json(profile);

  } catch (error) {
    console.error("Public LeetCode error:", error);

    res.status(500).json({
      message: "Failed to fetch public LeetCode profile",
    });
  }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getPublicProfile,
  getPublicProjects,
  getPublicEducation,
  getPublicCertifications,
  getPublicLeetCode,
};