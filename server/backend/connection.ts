import { Sequelize } from "sequelize";

let sequelize: Sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize("postgres", "postgres", "postgres", {
    host: "db",
    dialect: "postgres",
    logging: false,
  });
} else {
  if (!global.sequelize) {
    global.sequelize = new Sequelize("postgres", "postgres", "postgres", {
      host: "db",
      dialect: "postgres",
    });
  }
  sequelize = global.sequelize;
}

export default sequelize;
