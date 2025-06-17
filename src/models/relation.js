import sequelize from "../config/db.js";
import CartItems from "./cartItems.js";
import Comments from "./comment.js";
import OrderDetail from "./orderDetails.js";
import OrderDetailDraft from "./orderDetailsDraft.js";
import OrderDraftItem from "./orderDraftItem.js";
import Orders from "./orders.js";
import OrdersDraft from "./ordersDraft.js";
import Products from "./product.js";
import ShippingAddress from "./shippingAddress.js";
import ShippingAddressDraft from "./shippingAddressDraft.js";
import Users from "./user.js";

// Comments <-> Users
Comments.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(Comments, { foreignKey: "user_id" });

// Comments <-> Products
Comments.belongsTo(Products, { foreignKey: "product_id" });
Products.hasMany(Comments, { foreignKey: "product_id" });

// CartItems <-> Users
CartItems.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(CartItems, { foreignKey: "user_id" });

// CartItems <-> Products
CartItems.belongsTo(Products, { foreignKey: "product_id" });
Products.hasMany(CartItems, { foreignKey: "product_id" });

// Orders <-> OrderDetail
OrderDetail.belongsTo(Orders, { foreignKey: "order_id", onDelete: "CASCADE" });
Orders.hasMany(OrderDetail, { foreignKey: "order_id", onDelete: "CASCADE" });

// Orders <-> ShippingAddress
ShippingAddress.belongsTo(Orders, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
});
Orders.hasOne(ShippingAddress, { foreignKey: "order_id", onDelete: "CASCADE" });

// OrdersDraft <-> OrderDetailDraft
OrderDetailDraft.belongsTo(OrdersDraft, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
});
OrdersDraft.hasMany(OrderDetailDraft, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
});

// OrdersDraft <-> ShippingAddressDraft
ShippingAddressDraft.belongsTo(OrdersDraft, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
});
OrdersDraft.hasOne(ShippingAddressDraft, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
});

// OrdersDraft <-> OrderDraftItem (FIXED: arah relasi yang benar)
OrderDraftItem.belongsTo(OrdersDraft, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
});
OrdersDraft.hasMany(OrderDraftItem, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
});

// OrderDraftItem <-> CartItems
CartItems.belongsTo(OrderDraftItem, {
  foreignKey: "cart_item_id",
  onDelete: "CASCADE",
});
OrderDraftItem.hasMany(CartItems, {
  foreignKey: "cart_item_id",
  onDelete: "CASCADE",
});

export {
  sequelize,
  Users,
  Products,
  Comments,
  CartItems,
  OrderDetail,
  Orders,
  ShippingAddress,
  OrdersDraft,
  OrderDetailDraft,
  ShippingAddressDraft,
  OrderDraftItem,
};
