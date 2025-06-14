import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Orders from "./orders.js";

const ShippingAddress = sequelize.define(
  "ShippingAddress",
  {
    shipping_address_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.UUID,

      references: {
        model: Orders,
        key: "order_id",
      },
      allowNull: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    receiver_name: {
      type: DataTypes.STRING(50),
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
  },
  {
    tableName: "shipping_address",
    timestamps: false,
  }
);

export default ShippingAddress;
