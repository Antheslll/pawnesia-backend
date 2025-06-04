const sendSuccessResponse = (
  res,
  statusCode = 200,
  message = "OK",
  errors = []
) => {
  return res.status(statusCode).json({
    status: "Success",
    message,
    errors,
  });
};

export default sendSuccessResponse;
