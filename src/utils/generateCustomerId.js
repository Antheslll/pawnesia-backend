import Users from "../models/user.js";

const generatedCustomerId = async () => {
  const amountUser = await Users.count();
  const nextId = amountUser + 1;
  return `CU${String(nextId).padStart(3, "0")}`;
};

export default generatedCustomerId;
