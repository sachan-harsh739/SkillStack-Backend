const express = require("express");

const {
  getPublicUser,
  getPublicProjects,
  getPublicEducation,
  getPublicCertifications,
  getPublicLeetCode,
} = require("../controllers/publicController");

const router = express.Router();

// ==========================================
// PUBLIC PROFILE
// ==========================================

router.get(
  "/profile",
  getPublicUser
);

// ==========================================
// PUBLIC PROJECTS
// ==========================================

router.get(
  "/projects",
  getPublicProjects
);

router.get(
  "/expertise",
  getPublicProjects
);

// ==========================================
// PUBLIC EDUCATION
// ==========================================

router.get(
  "/education",
  getPublicEducation
);

// ==========================================
// PUBLIC CERTIFICATIONS
// ==========================================

router.get(
  "/certifications",
  getPublicCertifications
);

// ==========================================
// PUBLIC LEETCODE
// ==========================================

router.get(
  "/leetcode",
  getPublicLeetCode
);

module.exports = router;
