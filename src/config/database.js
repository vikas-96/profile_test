import Sequelize from 'sequelize';
import config from "./config.cjs";
const env = process.env.NODE_ENV || "production";

export default new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
    operatorsAliases: 0,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: "+05:30",
  }
);
