import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  host: "db",
  dialect: "postgres",
  logging: false,
});
