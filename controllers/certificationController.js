const Certification = require("../models/certificationModel");

// ==========================================
// GET ALL CERTIFICATIONS
// ==========================================

const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["id", "DESC"]],
    });

    res.status(200).json(certifications);

  } catch (error) {
    console.error("Get certifications error:", error);

    res.status(500).json({
      message: "Failed to fetch certifications",
      error: error.message,
    });
  }
};


// ==========================================
// ADD CERTIFICATION
// ==========================================

const addCertification = async (req, res) => {
  try {
    const {
      certificateName,
      issuingOrganization,
      issueDate,
      credentialId,
      credentialUrl,
    } = req.body;

    if (
      !certificateName ||
      !certificateName.trim()
    ) {
      return res.status(400).json({
        message: "Certificate name is required",
      });
    }

    if (
      !issuingOrganization ||
      !issuingOrganization.trim()
    ) {
      return res.status(400).json({
        message: "Issuing organization is required",
      });
    }

    const certification = await Certification.create({
      userId: req.user.id,

      certificateName:
        certificateName.trim(),

      issuingOrganization:
        issuingOrganization.trim(),

      issueDate:
        issueDate || null,

      credentialId:
        credentialId
          ? credentialId.trim()
          : null,

      credentialUrl:
        credentialUrl
          ? credentialUrl.trim()
          : null,
    });

    res.status(201).json({
      message: "Certification added successfully",
      certification,
    });

  } catch (error) {
    console.error("Add certification error:", error);

    res.status(500).json({
      message: "Failed to add certification",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE CERTIFICATION
// ==========================================

const updateCertification = async (req, res) => {
  try {
    const { id } = req.params;

    const certification =
      await Certification.findOne({
        where: {
          id,
          userId: req.user.id,
        },
      });

    if (!certification) {
      return res.status(404).json({
        message: "Certification not found",
      });
    }

    const {
      certificateName,
      issuingOrganization,
      issueDate,
      credentialId,
      credentialUrl,
    } = req.body;

    if (certificateName !== undefined) {
      if (!certificateName.trim()) {
        return res.status(400).json({
          message: "Certificate name is required",
        });
      }

      certification.certificateName =
        certificateName.trim();
    }

    if (issuingOrganization !== undefined) {
      if (!issuingOrganization.trim()) {
        return res.status(400).json({
          message:
            "Issuing organization is required",
        });
      }

      certification.issuingOrganization =
        issuingOrganization.trim();
    }

    if (issueDate !== undefined) {
      certification.issueDate =
        issueDate || null;
    }

    if (credentialId !== undefined) {
      certification.credentialId =
        credentialId
          ? credentialId.trim()
          : null;
    }

    if (credentialUrl !== undefined) {
      certification.credentialUrl =
        credentialUrl
          ? credentialUrl.trim()
          : null;
    }

    await certification.save();

    res.status(200).json({
      message: "Certification updated successfully",
      certification,
    });

  } catch (error) {
    console.error(
      "Update certification error:",
      error
    );

    res.status(500).json({
      message: "Failed to update certification",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE CERTIFICATION
// ==========================================

const deleteCertification = async (req, res) => {
  try {
    const { id } = req.params;

    const certification =
      await Certification.findOne({
        where: {
          id,
          userId: req.user.id,
        },
      });

    if (!certification) {
      return res.status(404).json({
        message: "Certification not found",
      });
    }

    await certification.destroy();

    res.status(200).json({
      message: "Certification deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete certification error:",
      error
    );

    res.status(500).json({
      message: "Failed to delete certification",
      error: error.message,
    });
  }
};


module.exports = {
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification,
};
