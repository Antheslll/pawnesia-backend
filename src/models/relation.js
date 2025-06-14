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

//Comments---Users
Comments.belongsTo(Users, { foreignKey: "user_id", targetKey: "user_id" });
Users.hasMany(Comments, { foreignKey: "user_id", targetKey: "user_id" });

//Commments---Products
Comments.belongsTo(Products, {
  foreignKey: "product_id",
  targetKey: "product_id",
});
Products.hasMany(Comments, {
  foreignKey: "product_id",
  sourceKey: "product_id",
});

//CartItems---Users
CartItems.belongsTo(Users, { foreignKey: "user_id", targetKey: "user_id" });
Users.hasMany(CartItems, { foreignKey: "user_id", targetKey: "user_id" });

CartItems.belongsTo(Products, {
  foreignKey: "product_id",
  targetKey: "product_id",
});
Products.hasMany(CartItems, {
  foreignKey: "product_id",
  targetKey: "product_id",
});

//orders---order detail
OrderDetail.belongsTo(Orders, {
  foreignKey: "order_id",
  targetKey: "order_id",
});

Orders.hasMany(OrderDetail, {
  foreignKey: "order_id",
  targetKey: "order_id",
});

//orders---shippingAddress
Orders.hasOne(ShippingAddress, {
  foreignKey: "order_id",
  targetKey: "order_id",
});

//ordersdraft---order detail
OrderDetailDraft.belongsTo(OrdersDraft, {
  foreignKey: "order_id",
  targetKey: "order_id",
});

OrdersDraft.hasMany(OrderDetailDraft, {
  foreignKey: "order_id",
  targetKey: "order_id",
});

//orders---shippingAddress
OrdersDraft.hasOne(ShippingAddressDraft, {
  foreignKey: "order_id",
  targetKey: "order_id",
});

//orderDraftItem---orderDraft
OrdersDraft.belongsTo(OrderDraftItem, {
  foreignKey: "order_id",
  targetKey: "order_id",
});

OrderDraftItem.hasMany(OrdersDraft, {
  foreignKey: "order_id",
  targetKey: "order_id",
});

//orderDraftItem---cartItem
CartItems.belongsTo(OrderDraftItem, {
  foreignKey: "cart_item_id",
  targetKey: "cart_item_id",
});

OrderDraftItem.hasMany(CartItems, {
  foreignKey: "cart_item_id",
  targetKey: "cart_item_id",
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
};
