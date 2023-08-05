import { Validator } from "node-input-validator";

export const loginValidation = data => {
  const v = new Validator(data, {
    email: "required|email",
    password: "required|string"
  });
  return v;
};
