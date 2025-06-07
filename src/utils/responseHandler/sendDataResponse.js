const sendDataResponse = (res, statusCode = 200, message = "OK", data = []) => {
  return res.status(statusCode).json({
    status: "Success",
    message,
    data: data,
  });
};

export default sendDataResponse;
