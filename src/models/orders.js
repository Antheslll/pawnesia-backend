import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Users from "./user.js";

const Orders = sequelize.define(
  "Orders",
  {
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,

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

    order_time: { type: DataTypes.DATE, allowNull: false },
    estimate_arrival: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    stat: {
      type: DataTypes.ENUM("PENDING", "PACKAGES", "DELIVER", "RECEIVED"),
      allowNull: false,
    },
    proof_of_transfer: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    total_price: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

export default Orders;
