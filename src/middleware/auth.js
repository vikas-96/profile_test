import jwt from "jsonwebtoken";
import _ from "lodash";

export function getJwtToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
}

export function isAuthunticated(req, res, next) {
  try {
    if (_.isUndefined(req.headers.authorization)) {
      return res.status(401).json({
        message: "Not Authorized to access this resource!",
      });
    }
    const Bearer = req.headers.authorization.split(" ")[0];

    if (!Bearer || Bearer !== "Bearer") {
      return res.status(401).json({
        message: "Not Authorized to access this resource!",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Not Authorized to access this resource!",
      });
    }

    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET_KEY ?? "SECRET", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "please provide a valid token, your token might be expired",
        });
      }
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
