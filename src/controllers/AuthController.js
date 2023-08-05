import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { loginValidation } from "../validations/auth.js";

export const login = async (req, res, next) => {
  const valid = loginValidation(req.body);
  const matched = await valid.check();
  if (!matched) return res.status(422).json(valid.errors);
  try{
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user == null) return res.status(401).json({ message: "Login failed" });

    return bcrypt.compare(req.body.password, user.password, (err, result) => {
      if(!result) return res.status(401).json({ message: "Login failed" });
      const token = jwt.sign(
        {
          email: user.email,
          id: user.id
        },
        process.env.JWT_SECRET_KEY ?? "SECRET",
        { expiresIn: "2d" }
      );
      
      // res.set({'Content-Type': 'application/json'});
      return res.status(200).json({
        message: "Login successfully.",
        access_token: token,
      });
    });
  }
  catch(err) {
    return res.status(500).json({
      message: err.message,
    });
  };
};
