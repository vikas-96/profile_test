import custom from "node-input-validator";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const unique = custom.extend("unique", async ({ value, args }) => {
  let field = args[1] || "email";

  let condition = {
    where: {
      [field]: value,
    },
  };

  // add ignore condition
  if (args[2]) {
    condition = {
      where: {
        id: {
          [Op.ne]: args[2],
        },
        email: {
          [Op.eq]: value,
        },
      },
    };
  }
  const emailExist = await User.findOne(condition);
  if(emailExist) return false;

  return true;
});

export const getUserDetailByToken = (token) => {
  return jwt.decode(token);
};