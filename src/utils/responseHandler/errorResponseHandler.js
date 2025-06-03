const sendErrorResponse = (
  res,
  statusCode = 400,
  message = "Bad Request",
  errors = []
) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};

export default sendErrorResponse;
