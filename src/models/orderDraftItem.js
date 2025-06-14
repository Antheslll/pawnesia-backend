import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import CartItems from "./cartItems.js";
import OrdersDraft from "./ordersDraft.js";

const OrderDraftItem = sequelize.define(
  "OrderDraftItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
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
    cart_item_id: {
      type: DataTypes.UUID,
      references: {
        model: CartItems,
        key: "cart_item_id",
      },
      allowNull: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "order_draft_item",
    timestamps: false,
  }
);

export default OrderDraftItem;
