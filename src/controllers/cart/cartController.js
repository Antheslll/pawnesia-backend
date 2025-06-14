import { CartItems, Products, Users } from "../../models/relation.js";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";
import sendDataResponse from "../../utils/responseHandler/sendDataResponse.js";
import sendSuccessResponse from "../../utils/responseHandler/successResponseHandler.js";
import { v4 as uuidv4 } from "uuid";

const createNewItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const createdTime = new Date();

    if (!userId || !productId || !quantity) {
      return sendErrorResponse(
        res,
        400,
        "data for Items of Cart is not valid",
        {
          userId,
          productId,
          quantity,
        }
      );
    }

    const cartItemExists = await CartItems.findOne({
      where: { user_id: userId, product_id: productId },
    });

    if (cartItemExists) {
      cartItemExists.quantity += 1;
      await cartItemExists.save();
      return sendSuccessResponse(
        res,
        200,
        "Berhasil menambahkan Item ke keranjang",
        { previousData: cartItemExists }
      );
    } else {
      const newCartItemId = uuidv4();

      await CartItems.create({
        cart_item_id: newCartItemId,
        user_id: userId,
        product_id: productId,
        quantity,
        created_at: createdTime,
      });

      const dataItems = await CartItems.findOne({
        where: { cart_item_id: newCartItemId },
      });

      return sendSuccessResponse(
        res,
        200,
        "Berhasil menambahkan Item Ke keranjang",
        dataItems
      );
    }
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, 500, "Server error woi", {
      message: err.message,
    });
  }
};

const displayCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return sendErrorResponse(
        res,
        400,
        `there is no userId ${userId} in the database`,
        {
          userId,
        }
      );
    }

    const userCartItems = await CartItems.findAll({
      include: [
        {
          model: Products,
          attributes: [
            "product_id",
            "uuid",
            "product_name",
            "product_price",
            "product_image",
          ],
        },
        {
          model: Users,
          where: { user_id: userId },
          attributes: [],
        },
      ],
    });

    if (userCartItems.length === 0) {
      return sendDataResponse(
        res,
        404,
        `There is no Cart Items for user ${userId}`,
        userCartItems
      );
    }

    return sendDataResponse(
      res,
      200,
      "Cart Items Display Successfully",
      userCartItems
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, 400, "Cart Items Failed to Display", err);
  }
};

const cartItemsDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CartItems.destroy({
      where: { cart_item_id: id },
    });

    if (deleted === 0) {
      return sendErrorResponse(res, 400, "item tidak ditemukan", deleted);
    }

    return sendSuccessResponse(
      res,
      200,
      `Item dengan id ${id} berhasil dihapus`,
      deleted
    );
  } catch (err) {
    sendErrorResponse(res, 400, "Terjadi kesalahan", err);
  }
};

const cartItemsQuantityControll = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!itemId || !quantity) {
      return sendErrorResponse(
        res,
        400,
        `itemId or Quantity could be invalid`,
        {
          itemId,
          quantity,
        }
      );
    }

    const item = await CartItems.findByPk(itemId);

    if (!item) {
      return sendErrorResponse(res, 404, "item not found", item);
    }

    item.quantity = quantity;

    await item.save();

    return sendSuccessResponse(res, 200, "Quantity berhasil diupdate", item);
  } catch (err) {
    return sendErrorResponse(res, 500, "Terjadi Kesalahan", err.message);
  }
};

export {
  createNewItems,
  displayCartItems,
  cartItemsDelete,
  cartItemsQuantityControll,
};
