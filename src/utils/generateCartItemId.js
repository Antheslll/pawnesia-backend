import CartItems from "../models/cartItems.js";

export const generatedCartItemId = async () => {
  const amountCartItemId = await CartItems.count();
  const nextId = amountCartItemId + 1;
  return `CI${String(nextId).padStart(3, "0")}`;
};

export default generatedCartItemId;
