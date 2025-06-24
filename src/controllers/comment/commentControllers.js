import { Comments, sequelize, Users } from "../../models/relation.js";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";
import sendDataResponse from "../../utils/responseHandler/sendDataResponse.js";
import { Products } from "../../models/relation.js";
import sendSuccessResponse from "../../utils/responseHandler/successResponseHandler.js";
import { UUIDV4 } from "sequelize";

const getComment = async (req, res) => {
  try {
    const { uuid } = req.params;
    if (!uuid) {
      sendErrorResponse(res, 400, "No UUID", { the_params: req.params });
      return;
    }

    const productsComment = await Comments.findAll({
      include: [
        {
          model: Products,
          where: { uuid: uuid },
          attributes: [],
        },
        {
          model: Users,
          attributes: ["profile_picture", "first_name", "last_name"],
        },
      ],
    });

    return sendDataResponse(
      res,
      200,
      `Get Product for ${productsComment.comment_id} where the UUID: ${uuid}`,
      productsComment
    );
  } catch (err) {
    return sendErrorResponse(res, 500, "Server error", {
      message: err.message,
    });
  }
};

export default getComment;

const createComment = async (req, res) => {
  try {
    const { userId, productId, comment, link, rating } = req.body;
    const createdTime = await req.commentComplete.createdAt;

    if (!userId || !productId || !comment || !link || !rating || !createdTime) {
      return sendErrorResponse(res, 400, "Cannot Post Comment", {
        data: { userId, productId, comment, link, rating, createdTime },
      });
    }

    const newCommentId = UUIDV4();

    await Comments.create({
      comment_id: newCommentId,
      user_id: userId,
      product_id: productId,
      comments: comment,
      link: link,
      rating: rating,
      comment_time: createdTime,
    });

    return sendSuccessResponse(res, 200, "Success Add Comment", {
      field: "Comments",
      desc: `Komen berhasil ditambahkan dengan ID User: ${userId} dan Id Produk: ${productId}`,
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Server error", [
      { message: err.message },
    ]);
  }
};

const showComment = async (req, res) => {
  try {
    const allComments = await Comments.findAll({
      include: [
        {
          model: Products,
          attributes: { exclude: [] },
        },
        {
          model: Users,
          attributes: ["profile_picture", "first_name", "last_name"],
        },
      ],
    });

    //     const commentWithUser = await sequelize.query(
    //       `
    //   SELECT c.*, u.first_name, u.last_name, u.profile_picture
    //   FROM Comments c
    //   LEFT JOIN Users u ON c.user_id = u.user_id
    //   WHERE u.user_id IS NULL
    // `,
    //       { type: sequelize.QueryTypes.SELECT }
    //     );

    //     console.log(commentWithUser);

    return sendDataResponse(res, 200, `Success Get Comment `, allComments);
  } catch (err) {
    console.error("Error: ", err);
    return err;
  }
};

export { createComment, showComment };
