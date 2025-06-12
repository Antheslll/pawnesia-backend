import cloudinary from "../../config/cloudinary.js";
import fs from "fs";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";
import sendSuccessResponse from "../../utils/responseHandler/successResponseHandler.js";

export const handleUpload = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "link-source-comment",
    });

    fs.unlinkSync(req.file.path);
    return sendSuccessResponse(
      res,
      200,
      "Berhasil Menambahkan file ke Cloud",
      result.secure_url
    );
  } catch (err) {
    console.error(err);
    sendErrorResponse(res, 500, "upload gagal", {
      message: err.message,
      name: err.name,
      stack: err.stack,
    });
  }
};
