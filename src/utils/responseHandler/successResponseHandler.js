const sendSuccessResponse = (
  res,
  statusCode = 200,
  message = "OK",
  details = []
) => {
  return res.status(statusCode).json({
    status: "Success",
    message,
    detail: details,
  });
};

export default sendSuccessResponse;
