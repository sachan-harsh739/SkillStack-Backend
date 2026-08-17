const express = require("express");

const {
  getPublicProfile,
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
  getPublicProfile
);

// ==========================================
// PUBLIC PROJECTS
// ==========================================

router.get(
  "/projects",
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