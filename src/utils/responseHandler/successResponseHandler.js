const sendSuccessResponse = (
  res,
  statusCode = 200,
  message = "OK",
  errors = []
) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};

export default sendSuccessResponse;
