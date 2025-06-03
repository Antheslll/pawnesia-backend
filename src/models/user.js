const { DataTypes } = require("sequelize");
const sequelize = require("../config/db").default;

const Users = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.CHAR(5),
      primaryKey: true,
      allowNull: false,
      comment: "ID Unik Pengguna",
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    role: {
      type: DataTypes.ENUM("CUSTOMER", "SELLER"),
      allowNull: false,
      defaultValue: "SELLER",
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = Users;
