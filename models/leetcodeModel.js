const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const LeetCode = sequelize.define(
  "LeetCode",
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

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    profileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "leetcode_profiles",
    timestamps: true,
  }
);

module.exports = LeetCode;
