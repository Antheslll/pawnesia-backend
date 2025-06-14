import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Users from "./user.js";
import Products from "./product.js";

const CartItems = sequelize.define(
  "CartItems",
  {
    cart_item_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "cart_items",
    timestamps: false,
  }
);

export default CartItems;
