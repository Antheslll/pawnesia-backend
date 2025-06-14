import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Users from "./user.js";

const OrdersDraft = sequelize.define(
  "OrdersDraft",
  {
    order_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
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

    order_time: { type: DataTypes.DATE, allowNull: true },
    estimate_arrival: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "PACKAGES", "DELIVER", "RECEIVED"),
      allowNull: true,
    },
    proof_of_transfer: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    total_price: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "order_draft",
    timestamps: false,
  }
);

export default OrdersDraft;
