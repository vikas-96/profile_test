import { Validator } from "node-input-validator";
import { unique } from "../utils/helper.js";
import _ from "lodash";

export const validation = (data, userid = null) => {
  let emailValidation = "required|sometimes|email|unique:User,email";
  let password = "required|sometimes|string|same:confirm_password";
  if (!_.isNull(userid)) {
    emailValidation = `required|sometimes|email|unique:User,email,${userid}`;
    password = "string";
  }
  const v = new Validator(data, {
    firstname: "required|sometimes",
    lastname: "required|sometimes",
    email: emailValidation,
    password: password,
  });
  return v;
};
