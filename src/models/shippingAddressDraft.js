import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import OrdersDraft from "./ordersDraft.js";

const ShippingAddressDraft = sequelize.define(
  "ShippingAddressDraft",
  {
    shipping_address_id: {
      type: DataTypes.CHAR(5),
      primaryKey: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.UUID,
      references: {
        model: OrdersDraft,
        key: "order_id",
      },
      allowNull: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    receiver_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "shipping_address_draft",
    timestamps: false,
  }
);

export default ShippingAddressDraft;
