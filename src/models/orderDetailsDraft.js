import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Products from "./product.js";
import OrdersDraft from "./ordersDraft.js";

const OrderDetailDraft = sequelize.define(
  "OrderDetailDraft",
  {
    order_detail_id: {
      type: DataTypes.UUID,
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "order_detail_draft",
    timestamps: false,
  }
);

export default OrderDetailDraft;
