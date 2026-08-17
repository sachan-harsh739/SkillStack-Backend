const LeetCode = require("../models/leetcodeModel");

// ==========================================
// GET LEETCODE PROFILE
// ==========================================

const getLeetCode = async (req, res) => {
  try {
    const profile = await LeetCode.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!profile) {
      return res.status(200).json(null);
    }

    res.status(200).json(profile);

  } catch (error) {
    console.error("Get LeetCode error:", error);

    res.status(500).json({
      message: "Failed to fetch LeetCode profile",
      error: error.message,
    });
  }
};


// ==========================================
// ADD / SAVE LEETCODE PROFILE
// ==========================================

const addLeetCode = async (req, res) => {
  try {
    const {
      username,
      profileUrl,
    } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({
        message: "LeetCode username is required",
      });
    }

    if (!profileUrl || !profileUrl.trim()) {
      return res.status(400).json({
        message: "LeetCode profile URL is required",
      });
    }

    const existing = await LeetCode.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (existing) {
      return res.status(400).json({
        message:
          "LeetCode profile already exists. Please edit it.",
      });
    }

    const profile = await LeetCode.create({
      userId: req.user.id,
      username: username.trim(),
      profileUrl: profileUrl.trim(),
    });

    res.status(201).json({
      message: "LeetCode profile added successfully",
      profile,
    });

  } catch (error) {
    console.error("Add LeetCode error:", error);

    res.status(500).json({
      message: "Failed to add LeetCode profile",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE LEETCODE PROFILE
// ==========================================

const updateLeetCode = async (req, res) => {
  try {
    const profile = await LeetCode.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!profile) {
      return res.status(404).json({
        message: "LeetCode profile not found",
      });
    }

    const {
      username,
      profileUrl,
    } = req.body;

    if (username !== undefined) {
      if (!username.trim()) {
        return res.status(400).json({
          message: "LeetCode username is required",
        });
      }

      profile.username = username.trim();
    }

    if (profileUrl !== undefined) {
      if (!profileUrl.trim()) {
        return res.status(400).json({
          message: "LeetCode profile URL is required",
        });
      }

      profile.profileUrl = profileUrl.trim();
    }

    await profile.save();

    res.status(200).json({
      message: "LeetCode profile updated successfully",
      profile,
    });

  } catch (error) {
    console.error("Update LeetCode error:", error);

    res.status(500).json({
      message: "Failed to update LeetCode profile",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE LEETCODE PROFILE
// ==========================================

const deleteLeetCode = async (req, res) => {
  try {
    const profile = await LeetCode.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!profile) {
      return res.status(404).json({
        message: "LeetCode profile not found",
      });
    }

    await profile.destroy();

    res.status(200).json({
      message: "LeetCode profile deleted successfully",
    });

  } catch (error) {
    console.error("Delete LeetCode error:", error);

    res.status(500).json({
      message: "Failed to delete LeetCode profile",
      error: error.message,
    });
  }
};


module.exports = {
  getLeetCode,
  addLeetCode,
  updateLeetCode,
  deleteLeetCode,
};
