import Comments from "../models/comment.js";

export const generatedCommentsId = async () => {
  const amountComments = await Comments.count();
  const nextId = amountComments + 1;
  return `CM${String(nextId).padStart(3, "0")}`;
};
