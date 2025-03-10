import jwt from "jsonwebtoken";

export const generateToken = () => {
  return jwt.sign(
    {},
    process.env.JWT_SECRET,
    { expiresIn: "10y" }
  );
};
