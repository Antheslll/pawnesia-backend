import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Orders from "./orders.js";
import Products from "./product.js";

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    order_detail_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,

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
    product_id: {
      type: DataTypes.UUID,
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
    tableName: "order_detail",
    timestamps: false,
  }
);

export default OrderDetail;
