const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Certification = sequelize.define(
  "Certification",
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

    certificateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    issuingOrganization: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    credentialId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    credentialUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "certifications",
    timestamps: true,
  }
);

module.exports = Certification;
