const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Education = sequelize.define(
    "Education",
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

        // graduation / higher_secondary / secondary
        type: {
            type: DataTypes.ENUM(
                "graduation",
                "higher_secondary",
                "secondary"
            ),
            allowNull: false,
        },

        // Degree - only used for graduation
        degree: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // University / School name
        institution: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // Specialization - only used for graduation
        specialization: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // Graduation start year
        startYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        // Graduation end year
        endYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        // CGPA / Percentage
        score: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // School year
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "educations",
        timestamps: true,
    }
);

module.exports = Education;
