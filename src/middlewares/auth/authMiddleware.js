import jwt from "jsonwebtoken";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler";

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendErrorResponse(res, 401, "No Token", {
      message: "Unauthorized - No Token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return sendErrorResponse(res, 401, "Invalid or expired token", err.array());
  }
};

export default authenticateUser;
