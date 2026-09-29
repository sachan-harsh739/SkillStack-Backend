const Project = require("../models/projectModel");

// ==========================================
// PUBLIC PORTFOLIO USER
// ==========================================

const PUBLIC_USER_ID = 3;


// ==========================================
// GET ALL PROJECTS
// ==========================================

const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: {
                userId: PUBLIC_USER_ID,
            },
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json(projects);

    } catch (error) {
        console.error("Get expertise error:", error);

        res.status(500).json({
            message: "Failed to fetch expertise",
            error: error.message,
        });
    }
};


// ==========================================
// CREATE PROJECT
// ==========================================

const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            technologies,
            githubUrl,
            liveUrl,
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Expertise title is required",
            });
        }

        const project = await Project.create({
            userId: PUBLIC_USER_ID,
            title: title.trim(),
            description: description
                ? description.trim()
                : "",
            technologies: technologies
                ? technologies.trim()
                : "",
            githubUrl: githubUrl
                ? githubUrl.trim()
                : "",
            liveUrl: liveUrl
                ? liveUrl.trim()
                : "",
        });

        res.status(201).json({
            message: "Expertise created successfully",
            project,
        });

    } catch (error) {
        console.error("Create expertise error:", error);

        res.status(500).json({
            message: "Failed to create expertise",
            error: error.message,
        });
    }
};


// ==========================================
// UPDATE PROJECT
// ==========================================

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            technologies,
            githubUrl,
            liveUrl,
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Expertise title is required",
            });
        }

        const project = await Project.findOne({
            where: {
                id,
                userId: PUBLIC_USER_ID,
            },
        });

        if (!project) {
            return res.status(404).json({
                message: "Expertise not found",
            });
        }

        await project.update({
            title: title.trim(),

            description: description
                ? description.trim()
                : "",

            technologies: technologies
                ? technologies.trim()
                : "",

            githubUrl: githubUrl
                ? githubUrl.trim()
                : "",

            liveUrl: liveUrl
                ? liveUrl.trim()
                : "",
        });

        res.status(200).json({
            message: "Expertise updated successfully",
            project,
        });

    } catch (error) {
        console.error("Update expertise error:", error);

        res.status(500).json({
            message: "Failed to update expertise",
            error: error.message,
        });
    }
};


// ==========================================
// DELETE PROJECT
// ==========================================

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findOne({
            where: {
                id,
                userId: PUBLIC_USER_ID,
            },
        });

        if (!project) {
            return res.status(404).json({
                message: "Expertise not found",
            });
        }

        await project.destroy();

        res.status(200).json({
            message: "Expertise deleted successfully",
        });

    } catch (error) {
        console.error("Delete expertise error:", error);

        res.status(500).json({
            message: "Failed to delete expertise",
            error: error.message,
        });
    }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};