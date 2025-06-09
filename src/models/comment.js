import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Users from "./user.js";
import Products from "./product.js";

const Comments = sequelize.define(
  "Comment",
  {
    comment_id: {
      type: DataTypes.CHAR(5),
      primaryKey: true,
      allowNull: false,
      comment: "ID Unik Comment",
    },
    user_id: {
      type: DataTypes.CHAR(5),
      references: {
        model: Users,
        key: "user_id",
      },
      allowNull: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    product_id: {
      type: DataTypes.CHAR(5),
      references: {
        model: Products,
        key: "product_id",
      },
      allowNull: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    comment_time: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "comments",
    timestamps: false,
  }
);

export default Comments;
