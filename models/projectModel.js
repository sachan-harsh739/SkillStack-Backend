const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Project = sequelize.define(
    "Project",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        technologies: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        githubUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        liveUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "projects",
        timestamps: true,
    }
);

module.exports = Project;