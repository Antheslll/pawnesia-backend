import { validationResult, header } from "express-validator";

const verifyJwt = [
  header("authorization")
    .exists()
    .withMessage("Authorization header is required")
    .bail()
    .matches(/^Bearer\s.+$/)
    .withMessage("Invalid Authorization format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default verifyJwt;
