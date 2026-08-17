const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // ==========================================
        // USER ROLE
        // ==========================================

        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
        },

        university: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        graduationYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        linkedinUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        githubUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        portfolioUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);

module.exports = User;