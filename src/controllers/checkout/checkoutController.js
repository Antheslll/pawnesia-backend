import OrderDetailDraft from "../../models/orderDetailsDraft.js";
import OrdersDraft from "../../models/ordersDraft.js";
import Products from "../../models/product.js";
import ShippingAddressDraft from "../../models/shippingAddressDraft.js";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";
import { v4 as uuidv4 } from "uuid";
import sendSuccessResponse from "../../utils/responseHandler/successResponseHandler.js";
import OrderDraftItem from "../../models/orderDraftItem.js";
import sequelize from "../../config/db.js";
import {
  OrderDetail,
  CartItems,
  ShippingAddress,
} from "../../models/relation.js";

const CreateNewDraft = async (req, res) => {
  try {
    const { userId, cartItemId, productData } = req.body;

    if (!userId || !cartItemId || !productData) {
      return sendErrorResponse(res, 400, "Data yang diminta tidak sesuai ", {
        userId,
        cartItemId,
        productData,
      });
    }

    const productId = productData.map((item) => item.product_id);

    const dataProduk = await Products.findAll({
      where: { product_id: productId },
    });

    const cleanData = dataProduk.map((product) => product.get({ plain: true }));

    const mergedData = productData.map((item) => {
      const product = cleanData.find((p) => p.product_id === item.product_id);
      const subtotalPrice = item.quantity * product.product_price;

      return {
        ...item, // dari frontend: product_id, quantity
        ...product, // dari DB: nama, harga, image, dll
        subtotalPrice, // hasil kali quantity * harga
      };
    });

    console.log(mergedData);

    const totalPrice = await mergedData.reduce(
      (pricePrev, priceNext) => pricePrev + priceNext.subtotalPrice,
      0
    );

    const ordersDraftId = uuidv4();

    await sequelize.transaction(async (t) => {
      await OrdersDraft.create(
        {
          order_id: ordersDraftId,
          user_id: userId,
          order_time: null,
          estimate_arrival: null,
          status: null,
          proof_of_transfer: null,
          total_price: totalPrice,
        },
        {
          transaction: t,
        }
      );

      await ShippingAddressDraft.create(
        {
          shipping_address_id: uuidv4(),
          order_id: ordersDraftId,
          receiver_name: null,
          phone_number: null,
          address: null,
        },
        {
          transaction: t,
        }
      );

      await OrderDetailDraft.bulkCreate(
        mergedData.map((item) => ({
          order_detail_id: uuidv4(),
          order_id: ordersDraftId,
          product_id: item.product_id,
          quantity: item.quantity,
          amount: item.product_price,
          subtotal: item.subtotalPrice,
        })),
        { transaction: t }
      );

      await OrderDraftItem.bulkCreate(
        cartItemId.map((cartItem) => ({
          id: null,
          order_id: ordersDraftId,
          cart_item_id: cartItem,
        })),
        { transaction: t }
      );
    });

    const responseOrdersDraft = await OrdersDraft.findAll({
      where: { order_id: ordersDraftId },
    });
    const responseOrderDetailDraft = await OrderDetailDraft.findAll({
      where: { order_id: ordersDraftId },
    });
    const responseShippingAddress = await ShippingAddressDraft.findAll({
      where: { order_id: ordersDraftId },
    });

    return sendSuccessResponse(res, 200, "Berhasil membuat Order draft baru", {
      field: "orderDraft, orderDetailDraft, shippingAddressDraft",
      data: {
        OrdersDraftData: responseOrdersDraft,
        OrderDetailDraftData: responseOrderDetailDraft,
        ShippingAddressDraftData: responseShippingAddress,
      },
    });
  } catch (err) {
    console.error("Error: ", err);
    return sendErrorResponse(res, 400, "Something happen", err);
  }
};

const checkoutFinalization = async (req, res) => {
  try {
    const { ordersDraftData, orderDetailDraftData, shippingAddressDraftData } =
      req.body;

    if (
      !ordersDraftData ||
      !orderDetailDraftData ||
      !shippingAddressDraftData
    ) {
      return sendErrorResponse(res, 400, "Data yang diminta tidak sesuai", {
        ordersDraftData,
        orderDetailDraftData,
        shippingAddressDraftData,
      });
    }

    const totalPriceUpdated = orderDetailDraftData.reduce(
      (prev, next) => prev.quantity * prev.amount + next.quantity * next.amount
    );

    await OrdersDraft.update(
      { total_price: totalPriceUpdated },
      { where: { order_id: ordersDraftData.order_id } }
    );

    await Promise.all(
      orderDetailDraftData.map((item) =>
        OrderDetailDraft.update(
          {
            quantity: item.quantity,
            subtotal: item.quantity * item.amount,
          },
          {
            where: {
              order_detail_id: item.order_detail_id,
            },
          }
        )
      )
    );

    await ShippingAddressDraft.update(
      {
        receiver_name: shippingAddressDraftData.receiver_name,
        phone_number: shippingAddressDraftData.phone_number,
        address: shippingAddressDraftData.address,
      },
      {
        where: {
          shipping_address_id: shippingAddressDraftData.shipping_address_id,
        },
      }
    );

    return sendSuccessResponse(res, 200, "Berhasil membuat Order draft baru", {
      field:
        "orderDraft, orderDetailDraft, shippingAddressDraft, orderDraftItem",
    });
  } catch (err) {
    console.error("Error: ", err);
    return sendErrorResponse(res, 400, "Something happen", err);
  }
};

const proofingTransfer = async (req, res, next) => {
  try {
    const { orderId, link } = req.body;

    if (!orderId || !link) {
      return sendErrorResponse(res, 400, "Data yang diminta tidak sesuai", {
        orderId,
        link,
      });
    }

    await OrdersDraft.update(
      {
        proof_of_transfer: link,
        status: pending,
      },
      { where: { order_id: orderId } }
    );

    next();
  } catch (err) {
    console.error("Error: ", err);
    return sendErrorResponse(res, 400, "Something happen", err);
  }
};

const draftToRealOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const orderDraftData = await OrdersDraft.findOne({
      where: { order_id: orderId },
    });
    const orderDetailDraftData = await OrderDetailDraft.findAll({
      where: { order_id: orderId },
    });
    const shippingAddressData = await ShippingAddressDraft.findAll({
      where: { order_id: orderId },
    });
    const orderDraftItemData = await OrderDraftItem.findAll({
      where: { order_id: orderId },
    });

    const destroyCartId = orderDraftItemData.map((item) => item.cart_item_id);

    const finalOrderId = uuidv4();

    await sequelize.transaction(async (t) => {
      await Orders.create(
        {
          order_id: finalOrderId,
          user_id: orderDraftData.user_id,
          order_time: new Date(),
          estimate_arrival: null,
          stat: "PENDING",
          proof_of_transfer: orderDraftData.proof_of_transfer,
          total_price: orderDraftData.total_price,
        },
        { transaction: t }
      );

      await OrderDetail.bulkCreate(
        orderDetailDraftData.map((detail) => ({
          order_detail_id: uuidv4(),
          order_id: finalOrderId,
          product_id: detail.product_id,
          quantity: detail.quantity,
          amount: detail.amount,
          subtotal: detail.subtotal,
        })),
        {
          transaction: t,
        }
      );

      await ShippingAddress.bulkCreate(
        shippingAddressData.map((draftAddress) => ({
          shipping_address_id: uuidv4(),
          order_id: finalOrderId,
          receiver_name: draftAddress.receiver_name,
          phone_number: draftAddress.phone_number,
          address: draftAddress.address,
        })),
        { transaction: t }
      );

      await OrdersDraft.destroy({ where: { order_id: orderId } });
      await OrderDetailDraft.destroy({ where: { order_id: orderId } });
      await ShippingAddressDraft.destroy({ where: { order_id: orderId } });
      await CartItems.destroy({ where: { cart_item_id: destroyCartId } });
      await OrderDraftItem.destroy({ where: { cart_item_id: destroyCartId } });
    });
  } catch (err) {
    console.error("Error: ", err);
    return sendErrorResponse(res, 400, "Something happen", err);
  }
};

export {
  CreateNewDraft,
  checkoutFinalization,
  proofingTransfer,
  draftToRealOrder,
};
