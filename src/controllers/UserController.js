import User from "../models/User.js";
import { getUserDetailByToken } from "../utils/helper.js";
import { validation } from "../validations/user.js";
import bcrypt from "bcryptjs";

export const get_users = (req, res, next) => {
  User.findAll({ attributes: [
   "id",
   "name",
   "email",
   "age",
   "gender",
   "contact",
   "dob",
   "createdAt"
 ]})
    .then((data) => {
      return res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

export const create_user = async (req, res, next) => {
  const valid = validation(req.body);
  const matched = await valid.check();
  if (!matched) return res.status(422).json(valid.errors);
  let {
    name,
    password,
  } = req.body;

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      } else {
        const email = req.body.email.toLowerCase().trim();
        User.sequelize.transaction().then(async (t) => {
          User.create(
            {
              name,
              email: email,
              password: hash,
            },
            { transaction: t }
          )
            .then((data) => {
              if (!data) {
                t.rollback();
                return res.status(500).json({
                  message: "Something Went Wrong.",
                });
              }

              t.commit();
              return res.status(201).json({
                message:
                  "Registered successfully.",
              });
            })
            .catch((err) => {
              t.rollback();
              return res.status(500).json({
                message: err.message,
              });
            });
        });
      }
    });
  } catch (err) {
    return err.message;
  }
};

export const show_user = (req, res, next) => {
  const id = req.params.id;
  User.findByPk(id, {
    attributes: [
      "age",
      "gender",
      "contact",
    ]
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "Record not found",
        });
      }
      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

export const update_user = async (req, res, next) => {
  const userid = req.params.id;
  const valid = validation(req.body, userid);
  const matched = await valid.check();
  if (!matched) return res.status(422).json(valid.errors);
  User.sequelize.transaction().then(async (t) => {
    User.update(
      {
        ...req.body,
      },
      {
        where: {
          id: userid,
        },
        transaction: t,
      }
    )
      .then((data) => {
        if (data == 0) {
          t.rollback();
          return res.status(404).json({
            message: "Id Not Found.",
          });
        }
        t.commit();
        return res.status(200).json({
          message: "User Updated."
        });
      })
      .catch((err) => {
        t.rollback();
        return res.status(500).json({
          message: err.message,
        });
      });
  });
};

export const show_login_user = (req, res, next) => {
  const user = getUserDetailByToken(req.headers.authorization.split(" ")[1]);
  User.findByPk(user.id, {
    attributes: [
      "name",
      "email",
      "age",
      "gender",
      "contact",
      "dob",
    ]
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "Record not found",
        });
      }
      return res.status(200).json({ data: data });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};
