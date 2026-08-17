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
        console.error("Get projects error:", error);

        res.status(500).json({
            message: "Failed to fetch projects",
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
                message: "Project title is required",
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
            message: "Project created successfully",
            project,
        });

    } catch (error) {
        console.error("Create project error:", error);

        res.status(500).json({
            message: "Failed to create project",
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
                message: "Project title is required",
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
                message: "Project not found",
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
            message: "Project updated successfully",
            project,
        });

    } catch (error) {
        console.error("Update project error:", error);

        res.status(500).json({
            message: "Failed to update project",
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
                message: "Project not found",
            });
        }

        await project.destroy();

        res.status(200).json({
            message: "Project deleted successfully",
        });

    } catch (error) {
        console.error("Delete project error:", error);

        res.status(500).json({
            message: "Failed to delete project",
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