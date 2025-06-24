import jwt from "jsonwebtoken";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";
import sendSuccessResponse from "../../utils/responseHandler/successResponseHandler.js";
import Users from "../../models/user.js";
import Orders from "../../models/orders.js";
import OrderDetail from "../../models/orderDetails.js";
import Products from "../../models/product.js";
const profileController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return sendErrorResponse(res, 400, "Token not Provide", { authHeader });

    const token = authHeader.split(" ")[1];
    if (!token)
      return sendErrorResponse(res, 400, "Token missing", { authHeader });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const requestUserId = decoded.userId;

    const userData = await Users.findOne({ where: { user_id: requestUserId } });

    return sendSuccessResponse(res, 200, "Akses berhasil", {
      requestUserId,
      userData,
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default profileController;

const editProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    const { firstName, lastName, phoneNumber, address } = req.body;

    if (!authHeader)
      return sendErrorResponse(res, 400, "Token not Provide", { authHeader });

    const token = authHeader.split(" ")[1];
    if (!token)
      return sendErrorResponse(res, 400, "Token missing", { authHeader });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userIdToken = decoded.userId;

    const userExists = await Users.findOne({
      where: { user_id: userIdToken },
    });

    if (!userExists) {
      return sendErrorResponse(res, 400, "User tidak ditemukan", {
        userExistsLength: userExists.length,
      });
    } else {
      const [editUserInfo] = await Users.update(
        {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          address,
        },
        {
          where: { user_id: userIdToken },
        }
      );

      if (editUserInfo === 0) {
        sendErrorResponse(
          res,
          400,
          "user tidak ditemukan atau tidak ada perubahan",
          { editUserLength: editUserInfo }
        );
      } else {
        sendSuccessResponse(res, 200, "profile berhasil diperbarui", {
          editUserLength: editUserInfo,
        });
      }
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

const showOrder = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return sendErrorResponse(res, 400, "Token not Provide", { authHeader });

    const token = authHeader.split(" ")[1];
    if (!token)
      return sendErrorResponse(res, 400, "Token missing", { authHeader });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userIdToken = decoded.userId;

    const userExists = await Users.findOne({
      where: { user_id: userIdToken },
    });

    if (!userExists) {
      return sendErrorResponse(res, 400, "User tidak ditemukan", {
        userExistsLength: userExists.length,
      });
    } else {
      const orderDataPending = await Orders.findAll({
        where: { user_id: userIdToken, stat: "PENDING" },
        include: [
          {
            model: OrderDetail,
            include: [{ model: Products }],
          },
        ],
      });
      const orderDataPackages = await Orders.findAll({
        where: { user_id: userIdToken, stat: "PACKAGES" },
        include: [
          {
            model: OrderDetail,
            include: [{ model: Products }],
          },
        ],
      });
      const orderDataDeliver = await Orders.findAll({
        where: { user_id: userIdToken, stat: "DELIVER" },
        include: [
          {
            model: OrderDetail,
            include: [{ model: Products }],
          },
        ],
      });
      const orderDataReceived = await Orders.findAll({
        where: { user_id: userIdToken, stat: "RECEIVED" },
        include: [
          {
            model: OrderDetail,
            include: [{ model: Products }],
          },
        ],
      });
      const orderDataConfirmation = await Orders.findAll({
        where: { user_id: userIdToken, stat: "CONFIRMATION" },
        include: [
          {
            model: OrderDetail,
            include: [{ model: Products }],
          },
        ],
      });

      return sendSuccessResponse(res, 200, "Data Order ditemukan", {
        orderDataPending,
        orderDataPackages,
        orderDataDeliver,
        orderDataConfirmation,
        orderDataReceived,
      });
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export { editProfile, showOrder };
