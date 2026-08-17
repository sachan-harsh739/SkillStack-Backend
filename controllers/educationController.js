const Education = require("../models/educationModel");

// ==========================================
// GET ALL EDUCATION
// ==========================================

const getEducation = async (req, res) => {
  try {
    const education = await Education.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["id", "ASC"]],
    });

    res.status(200).json(education);
  } catch (error) {
    console.error("Get education error:", error);

    res.status(500).json({
      message: "Failed to fetch education",
      error: error.message,
    });
  }
};


// ==========================================
// ADD EDUCATION
// ==========================================

const addEducation = async (req, res) => {
  try {
    const {
      type,
      degree,
      institution,
      specialization,
      startYear,
      endYear,
      score,
      year,
    } = req.body;

    const allowedTypes = [
      "graduation",
      "higher_secondary",
      "secondary",
    ];

    if (!type || !allowedTypes.includes(type)) {
      return res.status(400).json({
        message: "Invalid education type",
      });
    }

    if (!institution || !institution.trim()) {
      return res.status(400).json({
        message: "Institution name is required",
      });
    }

    // Graduation
    if (type === "graduation" && (!degree || !degree.trim())) {
      return res.status(400).json({
        message: "Degree is required for graduation",
      });
    }

    // Prevent duplicate education type
    const existing = await Education.findOne({
      where: {
        userId: req.user.id,
        type,
      },
    });

    if (existing) {
      return res.status(400).json({
        message: `${type.replace("_", " ")} already exists. Please edit the existing record.`,
      });
    }

    const education = await Education.create({
      userId: req.user.id,
      type,

      degree:
        type === "graduation"
          ? degree.trim()
          : null,

      institution: institution.trim(),

      specialization:
        type === "graduation" && specialization
          ? specialization.trim()
          : null,

      startYear:
        type === "graduation"
          ? startYear || null
          : null,

      endYear:
        type === "graduation"
          ? endYear || null
          : null,

      score: score ? String(score).trim() : null,

      year:
        type !== "graduation"
          ? year || null
          : null,
    });

    res.status(201).json({
      message: "Education added successfully",
      education,
    });

  } catch (error) {
    console.error("Add education error:", error);

    res.status(500).json({
      message: "Failed to add education",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE EDUCATION
// ==========================================

const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!education) {
      return res.status(404).json({
        message: "Education not found",
      });
    }

    const {
      type,
      degree,
      institution,
      specialization,
      startYear,
      endYear,
      score,
      year,
    } = req.body;

    if (type !== undefined) {
      const allowedTypes = [
        "graduation",
        "higher_secondary",
        "secondary",
      ];

      if (!allowedTypes.includes(type)) {
        return res.status(400).json({
          message: "Invalid education type",
        });
      }

      education.type = type;
    }

    if (institution !== undefined) {
      if (!institution.trim()) {
        return res.status(400).json({
          message: "Institution name is required",
        });
      }

      education.institution = institution.trim();
    }

    if (degree !== undefined) {
      education.degree = degree
        ? degree.trim()
        : null;
    }

    if (specialization !== undefined) {
      education.specialization = specialization
        ? specialization.trim()
        : null;
    }

    if (startYear !== undefined) {
      education.startYear =
        startYear || null;
    }

    if (endYear !== undefined) {
      education.endYear =
        endYear || null;
    }

    if (score !== undefined) {
      education.score = score
        ? String(score).trim()
        : null;
    }

    if (year !== undefined) {
      education.year = year || null;
    }

    await education.save();

    res.status(200).json({
      message: "Education updated successfully",
      education,
    });

  } catch (error) {
    console.error("Update education error:", error);

    res.status(500).json({
      message: "Failed to update education",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE EDUCATION
// ==========================================

const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!education) {
      return res.status(404).json({
        message: "Education not found",
      });
    }

    await education.destroy();

    res.status(200).json({
      message: "Education deleted successfully",
    });

  } catch (error) {
    console.error("Delete education error:", error);

    res.status(500).json({
      message: "Failed to delete education",
      error: error.message,
    });
  }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
};
