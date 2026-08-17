const express = require("express");

const {
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification,
} = require("../controllers/certificationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get certifications
router.get(
  "/",
  authMiddleware,
  getCertifications
);

// Add certification
router.post(
  "/",
  authMiddleware,
  addCertification
);

// Update certification
router.put(
  "/:id",
  authMiddleware,
  updateCertification
);

// Delete certification
router.delete(
  "/:id",
  authMiddleware,
  deleteCertification
);

module.exports = router;
