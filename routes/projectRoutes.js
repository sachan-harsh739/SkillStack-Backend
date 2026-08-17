const express = require("express");

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// ==========================================
// GET ALL PROJECTS
// PUBLIC
// ==========================================

router.get(
  "/",
  getProjects
);


// ==========================================
// CREATE PROJECT
// ADMIN ONLY
// ==========================================

router.post(
  "/",
  adminMiddleware,
  createProject
);


// ==========================================
// UPDATE PROJECT
// ADMIN ONLY
// ==========================================

router.put(
  "/:id",
  adminMiddleware,
  updateProject
);


// ==========================================
// DELETE PROJECT
// ADMIN ONLY
// ==========================================

router.delete(
  "/:id",
  adminMiddleware,
  deleteProject
);


module.exports = router;
