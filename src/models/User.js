import Sequelize from "sequelize";
import db from "../config/database.js";

const User = db.define(
  "users",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lock_password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    contact: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
