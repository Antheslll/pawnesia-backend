const getCurrentUser = (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
};

export default getCurrentUser;
