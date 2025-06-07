import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";
import sendSuccessResponse from "../../utils/responseHandler/successResponseHandler.js";
import Users from "../../models/user.js";
import generateCustomerId from "../../utils/generateCustomerId.js";

const customerRegister = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, address, role } =
      req.body;

    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      //409 status code = conflict
      return sendErrorResponse(res, 409, "User already Exists", [
        { field: "Email", message: "Email sudah dipakai" },
      ]);
    }

    const passwordHashing = await hash(password, 10);

    await Users.create({
      user_id: await generateCustomerId(),
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: passwordHashing,
      phone_number: phoneNumber,
      address: address,
      role: role,
    });

    return sendSuccessResponse(res, 201, "Success to create a new User", [
      { field: "User", message: "User berhasil dibuat" },
    ]);
  } catch (err) {
    return sendErrorResponse(res, 500, "Server error", {
      message: err.message,
    });
  }
};

export default customerRegister;

const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ where: { email } });

    if (!existingUser) {
      return sendErrorResponse(res, 401, "User haven't Exists", [
        {
          field: "Email",
          message: "Tidak dapat menemukan pengguna dengan Email yang sama",
        },
      ]);
    }
    const isPasswordMatch = await compare(password, existingUser.password);

    if (!isPasswordMatch) {
      return sendErrorResponse(res, 401, "Invalid Username or Password", [
        { field: "Password", message: "Password tidak cocok" },
      ]);
    }

    const token = jwt.sign(
      {
        userId: existingUser.user_id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
    );

    return res.status(200).json({
      message: "Login Success",
      token,
      user: {
        user_id: existingUser.user_id,
        email: existingUser.email,
        role: existingUser.role,
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        phoneNumber: existingUser.phone_number,
        address: existingUser.address,
      },
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Server error", [
      { message: err.message },
    ]);
  }
};

export { customerLogin };
