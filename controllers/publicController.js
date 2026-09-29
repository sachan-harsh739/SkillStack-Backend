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

const getPublicUser = async (req, res) => {
  try {
    const user = await User.findByPk(PUBLIC_USER_ID, {
      attributes: [
        "name",
        "university",
        "graduationYear",
        "linkedinUrl",
        "githubUrl",
        "portfolioUrl",
      ],
    });

    if (!user) {
      return res.status(200).json(null);
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
    console.error("Public expertise error:", error);

    res.status(500).json({
      message: "Failed to fetch public expertise",
    });
  }
};


// ==========================================
// PUBLIC HISTORY
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
    console.error("Public history error:", error);

    res.status(500).json({
      message: "Failed to fetch public history",
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
  getPublicUser,
  getPublicProjects,
  getPublicEducation,
  getPublicCertifications,
  getPublicLeetCode,
};
