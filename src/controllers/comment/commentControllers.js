import { Comments } from "../../models/relation.js";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";
import sendDataResponse from "../../utils/responseHandler/sendDataResponse.js";
import { Products } from "../../models/relation.js";

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
      ],
    });

    sendDataResponse(
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
